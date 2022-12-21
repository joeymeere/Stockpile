import React from 'react';
import { createContext, useContext, useMemo, useEffect, useState } from 'react';
import * as anchor from '@project-serum/anchor';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js';
import { IDL } from '../utils/stockpile'
import { useStateContext } from './state';
import toast from 'react-hot-toast';

const utf8 = require('utf8');

const StockpileContext = createContext();

const PROGRAM_ID = new PublicKey("STKqgkK72R1sJhV4BTipUcKkMFougtdTuDMr2RVubKr");

export const useStockpile = () => {
    const context = useContext(StockpileContext);
    if (!context) {
        throw new Error("Parent must be wrapped inside StockpileProvider")
      }
    return context;
}

export const StockpileProvider = ({children}) => {

    const [ fundraisers, setFundraisers ] = useState([]);
    const [ user, setUser ] = useState();
    const [ userAccounts, setUserAccounts ] = useState([]);
    const [ trendingAccounts, setTrendingAccounts ] = useState([]);
    const [ initialized, setInitialized ] = useState(false);
    const [ transactionFail, setTransactionFail ] = useState(false);
    const [ transactionPending, setTransactionPending ] = useState(false);
    const [ balance, setBalance ] = useState(0);

    const { currentFundraiserPubkey, currentCreator } = useStateContext();

    const anchorWallet = useAnchorWallet();
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    const program = useMemo(() => {
        if(anchorWallet) {
            const provider = new anchor.AnchorProvider(connection,
                anchorWallet,
                anchor.AnchorProvider.defaultOptions
                )
            return new anchor.Program(IDL, PROGRAM_ID, provider)
            }
        }, [connection, anchorWallet]
    )

    useEffect(() => {

        const query = async () => {
            if(program && publicKey) {
                try {
                        const fundraisers = await program.account.fundraiser.all(PROGRAM_ID.toString())
                            setFundraisers(fundraisers)

                        let objectAccounts = fundraisers.filter(fundraiser => fundraiser.account.beneficiary.toString() === publicKey.toString());
                            setUserAccounts(objectAccounts)
                        
                        let trendingSortedAccounts = fundraisers.sort((a, b) => b.account.raised - a.account.raised);

                        let trendingAccountsArray = trendingSortedAccounts.slice(0, 3);
                            setTrendingAccounts(trendingAccountsArray)

                } catch(err) {
                    console.log(err)
                }
            }
        }
        query()
        }, [program, publicKey]
    )

    //Initialize program and query a connected User's fundraisers
    useEffect(() => {

        const start = async () => {

            if(program && publicKey) {

                try {
                    //CHECK for user acc
                    //Working

                        let fetchBalance = await connection.getBalance(publicKey)
                        const userBalance = fetchBalance/LAMPORTS_PER_SOL;
                        setBalance(userBalance);

                        const [userPDA, bump] = await PublicKey.findProgramAddress(
                                [utf8.encode('fuckItWeBall!'), publicKey.toBuffer()],
                                program.programId
                            );
                        const userAcc = await program.account.user.fetch(userPDA.toString())
                            setUser(userAcc);

                //        const fundraisers = await program.account.fundraiser.all(PROGRAM_ID.toString())
                //            setFundraisers(fundraisers)

                //        let objectAccounts = fundraisers.filter(fundraiser => fundraiser.account.beneficiary.toString() === publicKey.toString());
                //            setUserAccounts(objectAccounts)
                /*        
                        let sortedAccounts = fundraisers.sort((a, b) => b.account.raised - a.account.raised);
                            console.log(sortedAccounts);

                        let trendingAccountsArray = sortedAccounts.slice(0, 2);
                            setTrendingAccounts(trendingAccountsArray)
                                console.log(trendingAccounts);
                */

                        if (userAcc) {
                            //console.log(`Found User Address: bump: ${bump}, pubkey: ${userPDA.toBase58()}`);
                            setInitialized(true);
                        }

                } catch(err) {
                    console.log(err)

                }
            }
        }
        start()
        }, [program, publicKey]
    )

    const getProgramDerivedFundraiserAddress = async (name, userPDA) => {
        const [fundraiserPDA, bump] = await PublicKey.findProgramAddress(
            [utf8.encode(name), userPDA.toBuffer(), publicKey.toBuffer()],
            program.programId
        );
      
        console.log(`Got ProgramDerivedAddress: bump: ${bump}, pubkey: ${fundraiserPDA.toBase58()}`);
        return { fundraiserPDA, bump };
    };

    const getProgramDerivedUserAddress = async () => {
        const [userPDA, bump] = await PublicKey.findProgramAddress(
            [utf8.encode('fuckItWeBall!'), publicKey.toBuffer()],
            program.programId
        );
      
        console.log(`Got ProgramDerivedAddress: bump: ${bump}, pubkey: ${userPDA.toBase58()}`);
        return { userPDA, bump };
    };

    const create = async (username, name, description, imageLink, websiteLink, contactLink, goal, category) => {
        console.log("CREATING FUNDRAISER...")

        if(program && publicKey) {
            setTransactionPending(true);

                console.log("FINDING PROGRAM ADDRESS...");
                const { userPDA } = await getProgramDerivedUserAddress();
                const { fundraiserPDA } = await getProgramDerivedFundraiserAddress(name, userPDA);

                console.log("SENDING TRANSACTION...");

                const transaction = new Transaction()

            if (initialized) {
                const fundraiserCreate = await program.methods.createFundraiser(name, description, imageLink, websiteLink, contactLink, goal, category)
                        .accounts({
                            fundraiser: fundraiserPDA,
                            beneficiary: anchorWallet.publicKey,
                            userAccount: userPDA,
                            rent: SYSVAR_RENT_PUBKEY,
                            systemProgram: SystemProgram.programId,
                        })
                .instruction()
                
                transaction.add(fundraiserCreate);

                transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

                transaction.feePayer = anchorWallet.publicKey;

                console.log(transaction);

                const tx = await anchorWallet.signTransaction(transaction)
                .catch(err => {
                    console.log(err);
                    setTransactionFail(true)
                    return;
                });

                if (transactionFail) {
                    return;
                }

                const buffer = tx.serialize().toString('base64');

                console.log('Sending...');

                try {
                    let txid = await connection.sendEncodedTransaction(buffer);
                    console.log(`Transaction submitted: https://solana.fm/tx/${txid}?cluster=devnet-qn1`)
                } catch (e) {
                    console.log(JSON.stringify(e))
                } finally {
                    setTransactionPending(false);
                 }
                } else {
                    const userCreate = await program.methods.createUser(username)
                        .accounts({
                            userAccount: userPDA,
                            authority: anchorWallet.publicKey,
                            systemProgram: SystemProgram.programId,
                        })
                         .instruction()

                    const fundraiserCreate = await program.methods.createFundraiser(name, description, imageLink, websiteLink, contactLink, goal, category)
                        .accounts({
                            fundraiser: fundraiserPDA,
                            beneficiary: anchorWallet.publicKey,
                            userAccount: userPDA,
                            rent: SYSVAR_RENT_PUBKEY,
                            systemProgram: SystemProgram.programId,
                        })
                         .instruction()

                    transaction.add(userCreate, fundraiserCreate);

                    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

                    transaction.feePayer = anchorWallet.publicKey;

                    console.log(transaction);

                    const tx = await anchorWallet.signTransaction(transaction)
                    .catch(err => {
                        console.log(err);
                        setTransactionFail(true)
                        return;
                    });

                    if (transactionFail) {
                        return;
                    }

                    const buffer = tx.serialize().toString('base64');

                    try {
                        let txid = await connection.sendEncodedTransaction(buffer);
                        console.log(`Transaction submitted: https://solana.fm/tx/${txid}?cluster=devnet-qn1`)
                    } catch (e) {
                        console.log(JSON.stringify(e))
                        alert(JSON.stringify(e))
                    } finally {
                        setTransactionPending(false);
                     }
                }
             }
         }

    const contribute = async (amount) => {

        console.log("CONTRIBUTING TO FUNDRAISER...")

        if (balance < amount) {
            return toast.error("Insufficient Balance")
        }

        if(program && publicKey) {
            setTransactionPending(true);

                const { userPDA } = await getProgramDerivedUserAddress();

                const fee = (amount * 0.01) * LAMPORTS_PER_SOL;

                console.log("SENDING TRANSACTION...");

                const userBalance = connection.getBalance(publicKey);

                if (userBalance < amount ) {
                    return toast.error("Insufficient Balance.");
                } else {

                const transaction = new Transaction()
            
                if (initialized) {
                    const contributeToFundraiser = await program.methods.contribute(new anchor.BN(amount))
                            .accounts({
                                fundraiser: currentFundraiserPubkey,
                                contributor: anchorWallet.publicKey,
                                userAccount: userPDA,
                            })
                    .instruction()

                    const sendFunds = SystemProgram.transfer({
                        fromPubkey: anchorWallet.publicKey,
                        toPubkey: currentFundraiserPubkey,
                        lamports: new anchor.BN(amount * LAMPORTS_PER_SOL),
                        });

                    const feeTaken = SystemProgram.transfer({
                            fromPubkey: anchorWallet.publicKey,
                            toPubkey: new PublicKey('ModqhB3M5Pj8sVQp5ayNHPHuP7XPTsrJXg8zpbhNJNQ'),
                            lamports: new anchor.BN(fee),
                        });
                    
                    transaction.add(contributeToFundraiser, sendFunds, feeTaken);
    
                    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    
                    transaction.feePayer = anchorWallet.publicKey;
    
                    console.log(transaction);
    
                    const tx = await anchorWallet.signTransaction(transaction)
                    .catch(err => {
                        console.log(err);
                        setTransactionFail(true)
                        return;
                    });
    
                    if (transactionFail) {
                        return;
                    }
    
                    const buffer = tx.serialize().toString('base64');
    
                    console.log('Sending...');
    
                    try {
                        let txid = await connection.sendEncodedTransaction(buffer);
                        console.log(`Transaction submitted: https://solana.fm/tx/${txid}?cluster=devnet-qn1`)
                    } catch (e) {
                        console.log(JSON.stringify(e))
                    } finally {
                        setTransactionPending(false);
                     }
                    } else {

                        console.log("FINDING PROGRAM ADDRESS...");
                        const { userPDA } = await getProgramDerivedUserAddress(String(currentCreator));

                        const userCreate = await program.methods.createUser(String(currentCreator))
                            .accounts({
                                userAccount: userPDA,
                                authority: anchorWallet.publicKey,
                                systemProgram: SystemProgram.programId,
                            })
                             .instruction()
    
                        const contributeToFundraiser = await program.methods.contribute(amount)
                             .accounts({
                                 fundraiser: currentFundraiserPubkey,
                                 contributor: anchorWallet.publicKey,
                                 userAccount: userPDA,
                             })
                            .instruction()

                        const sendFunds = SystemProgram.transfer({
                                fromPubkey: anchorWallet.publicKey,
                                toPubkey: currentFundraiserPubkey,
                                lamports: new anchor.BN(amount * LAMPORTS_PER_SOL),
                                });
        
                        const feeTaken = SystemProgram.transfer({
                                    fromPubkey: anchorWallet.publicKey,
                                    toPubkey: new PublicKey('ModqhB3M5Pj8sVQp5ayNHPHuP7XPTsrJXg8zpbhNJNQ'),
                                    lamports: new anchor.BN(fee),
                                });
    
                        transaction.add(userCreate, contributeToFundraiser, sendFunds, feeTaken);
    
                        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    
                        transaction.feePayer = anchorWallet.publicKey;
    
                        console.log(transaction);
    
                        const tx = await anchorWallet.signTransaction(transaction)
                        .catch(err => {
                            console.log(err);
                            setTransactionFail(true)
                            return;
                        });
    
                        if (transactionFail) {
                            return;
                        }
    
                        const buffer = tx.serialize().toString('base64');
    
                        try {
                            let txid = await connection.sendEncodedTransaction(buffer);
                            console.log(`Transaction submitted: https://solana.fm/tx/${txid}?cluster=devnet-qn1`)
                        } catch (e) {
                            console.log(JSON.stringify(e))
                            alert(JSON.stringify(e))
                        } finally {
                            setTransactionPending(false);
                         }
                    }
                   }
                 }
                }

    const updateUser = async (username) => {

        console.log("UPDATING...")

        if(program && publicKey) {
            setTransactionPending(true);

                const { userPDA } = await getProgramDerivedUserAddress();

                console.log("SENDING TRANSACTION...");

                const transaction = new Transaction()

                    const updateUsername = await program.methods.updateUser(username)
                            .accounts({
                                userAccount: userPDA,
                                authority: anchorWallet.publicKey,
                                systemProgram: SystemProgram.programId,
                            })
                    .instruction()
                    
                    transaction.add(updateUsername);
    
                    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    
                    transaction.feePayer = anchorWallet.publicKey;
    
                    console.log(transaction);
    
                    const tx = await anchorWallet.signTransaction(transaction)
                    .catch(err => {
                        console.log(err);
                        setTransactionFail(true)
                        return;
                    });
    
                    if (transactionFail) {
                        return;
                    }
    
                    const buffer = tx.serialize().toString('base64');
    
                    console.log('Sending...');
    
                    try {
                        let txid = await connection.sendEncodedTransaction(buffer);
                        console.log(`Transaction submitted: https://solana.fm/tx/${txid}?cluster=devnet-qn1`)
                    } catch (e) {
                        console.log(JSON.stringify(e))
                    } finally {
                        setTransactionPending(false);
                     }
              }
           }

        const withdraw = async (amount) => {

            console.log("WITHDRAWING FUNDRAISER...")
    
            if(program && publicKey) {
                setTransactionPending(true);
    
                    const { userPDA } = await getProgramDerivedUserAddress();
    
                    console.log("SENDING TRANSACTION...");
    
                    const userBalance = connection.getBalance(publicKey);
    
                    if (userBalance < amount ) {
                        return toast.error("Insufficient Balance.");
                    } else {
    
                    const transaction = new Transaction();
                
                    if (initialized) {
                        const withdrawFromFundraiser = await program.methods.fundraiserWithdraw(new anchor.BN(amount))
                                .accounts({
                                    fundraiser: currentFundraiserPubkey,
                                    userAccount: userPDA,
                                    beneficiary: anchorWallet.publicKey,
                                    systemProgram: SystemProgram.programId,
                                })
                        .instruction()
                        
                        transaction.add(withdrawFromFundraiser);
        
                        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        
                        transaction.feePayer = anchorWallet.publicKey;
        
                        console.log(transaction);
        
                        const tx = await anchorWallet.signTransaction(transaction)
                        .catch(err => {
                            console.log(err);
                            setTransactionFail(true)
                            return;
                        });
        
                        if (transactionFail) {
                            return;
                        }
        
                        const buffer = tx.serialize().toString('base64');
        
                        console.log('Sending...');
        
                        try {
                            let txid = await connection.sendEncodedTransaction(buffer);
                            console.log(`Transaction submitted: https://solana.fm/tx/${txid}?cluster=devnet-qn1`)
                        } catch (e) {
                            console.log(JSON.stringify(e))
                        } finally {
                            setTransactionPending(false);
                         }
                       }
                    }
                }
            }

            const updateFundraiser = async (description, websiteLink, contactLink) => {

                console.log("UPDATING FUNDRAISER...")
        
                if(program && publicKey) {
                    setTransactionPending(true);
        
                        const { userPDA } = await getProgramDerivedUserAddress();
        
                        console.log("SENDING TRANSACTION...");
        
                        const transaction = new Transaction();
                    
                        if (initialized) {
                            const updateFundraiserCredentials = await program.methods.updateFundraiser(description, websiteLink, contactLink)
                                    .accounts({
                                        fundraiser: currentFundraiserPubkey,
                                        userAccount: userPDA,
                                        beneficiary: anchorWallet.publicKey,
                                        systemProgram: SystemProgram.programId,
                                    })
                            .instruction()
                            
                            transaction.add(updateFundraiserCredentials);
            
                            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            
                            transaction.feePayer = anchorWallet.publicKey;
            
                            console.log(transaction);
            
                            const tx = await anchorWallet.signTransaction(transaction)
                            .catch(err => {
                                console.log(err);
                                setTransactionFail(true)
                                return;
                            });
            
                            if (transactionFail) {
                                return;
                            }
            
                            const buffer = tx.serialize().toString('base64');
            
                            console.log('Sending...');
            
                            try {
                                let txid = await connection.sendEncodedTransaction(buffer);
                                console.log(`Transaction submitted: https://solana.fm/tx/${txid}?cluster=devnet-qn1`)
                            } catch (e) {
                                console.log(JSON.stringify(e))
                            } finally {
                                setTransactionPending(false);
                             }
                           }
                        }
                    }
                         
    return (
        <StockpileContext.Provider 
            value={{
                program,
                connection,
                publicKey,
                balance,
                fundraisers,
                user,
                initialized,
                setInitialized,
                userAccounts,
                trendingAccounts,
                create,
                contribute,
                updateUser,
                withdraw,
                updateFundraiser,
                transactionPending,
                setTransactionPending,
            }}
        >
            {children}
        </StockpileContext.Provider>    
    )
}