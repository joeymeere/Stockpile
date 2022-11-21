import React from 'react';
import { createContext, useContext, useMemo, useEffect, useState } from 'react';
import * as anchor from '@project-serum/anchor';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction } from '@solana/web3.js';
import { IDL } from '../utils/stockpile'
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import * as borsh from '@project-serum/borsh';
import toast from "react-hot-toast";

const StockpileContext = createContext();

const PROGRAM_ID = new PublicKey("7iApoMteJ7ANz4dpN5kM6LdGjNRcaieqzxPHD6cddFY4");

export const useStockpile = () => {
    const context = useContext(StockpileContext);
    if (!context) {
        throw new Error("Parent must be wrapped inside StockpileProvider")
    }

    return context;
}

export class Fundraiser {
 
         static borshSchema = borsh.struct([
                     borsh.publicKey('beneficiary'),
                     borsh.str('name'),
                     borsh.str('description'),
                     borsh.str('imageLink'),
                     borsh.str('contactLink'),
                     borsh.str('websiteLink'),
                     borsh.u8('raised'),
                 ])
 
         static deserialize(buffer) {
                 if (!buffer) {
                     return null
                 }
                 try {
                     const { beneficiary, name, description, imageLink, contactLink, websiteLink, raised } = this.borshSchema.decode(buffer)
                     console.log(beneficiary.toBase58(), raised);
                     return new Fundraiser(beneficiary, name, description, imageLink, contactLink, websiteLink, raised)
                 } catch(error) {
                     console.log('Deserialization error:', error)
                     return null
                 }
          } 
     }

export const StockpileProvider = ({children}) => {

    const [ fundraisers, setFundraisers ] = useState();
    const [ transactionPending, setTransactionPending ] = useState(false);

    const anchorWallet = useAnchorWallet();
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    console.log("Connected wallet: ", publicKey);

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

    //Initialize program and query a connected User's fundraisers
    useEffect(() => {
        const start = async () => {
            console.log("Fetching data...")
            //Check for user
            //If user is found, fetch fundraisers
            //If none, set state to false (need button to init user)
            if(program && publicKey) {
                try {
                    //CHECK for user acc
                    //Working
                    const [fundraiserPDA] = await findProgramAddressSync([utf8.encode('fuckItWeBall'), publicKey.toBuffer()], program.programId)
                    const userFundraisers = await program.account.fundraiser.fetch(fundraiserPDA)


                    if (fundraisers) {
        
                    }
                } catch(err) {
                    console.log(err)

                }
            }
        }
        start()
        }, [program, publicKey]
    )

    const getProgramDerivedFundraiserAddress = async () => {
        const [fundraiserPDA, bump] = await PublicKey.findProgramAddress(
            [utf8.encode(name), publicKey.toBuffer()],
            program.programId
        );
      
        console.log(`Got ProgramDerivedAddress: bump: ${bump}, pubkey: ${fundraiserPDA.toBase58()}`);
        return { fundraiserPDA, bump };
    };

    const getAllFundraisers = async () => {
            try {
                const fundraisersData = await program.account.fundraiser.all();

                fundraisersData.sort(
                    (a,b)=> b.account.raised.toNumber() - a.account.raised.toNumber(),
                );

                console.log(fundraisersData);

                return fundraisersData;

            } catch(error) {
                console.log(error);
            }
    }

    const createFundraiser = async (name, description, websiteLink, contactLink, imageLink) => {
        console.log("CREATING FUNDRAISER...")

        if(program && publicKey) {
            setTransactionPending(true);
            try {
                console.log("FINDING PROGRAM ADDRESS...");
                const { fundraiserPDA, bump } = await getProgramDerivedFundraiserAddress();

                console.log("SENDING TRANSACTION...");
                const method = await program.methods.createFundraiser(name, description, websiteLink, contactLink, imageLink, fundraiserPDA)
                .accounts({
                    fundraiser: fundraiserPDA,
                    beneficiary: anchorWallet.publicKey,
                    rent: SYSVAR_RENT_PUBKEY,
                    systemProgram: SystemProgram.programId,
                }).rpc();
                
            //   const ix = await method.accounts({
            //         fundraiser: fundraiserPDA,
            //         beneficiary: anchorWallet.publicKey,
            //         rent: SYSVAR_RENT_PUBKEY,
            //         systemProgram: SystemProgram.programId,
            //    }).instruction(); 

            //    console.log('Building transaction...');
            //    const tx = new Transaction();

            //    tx.add(ix);
            //    console.log('Adding methods...');
//
             //   tx.recentBlockhash = (await connection.getLatestBlockhash());
             //   console.log("Blockhash recieved: ", tx.recentBlockhash);

             //   tx.feePayer = anchorWallet.publicKey;
             //   tx.serialize();

             //   await connection.sendTransaction(tx, anchorWallet);
                
               // if (additionalSigners?.length) {
               // tx.partialSign(...additionalSigners);
              //  }

            //    await anchorWallet.signTransaction(tx);

           //        console.log("TX: ", rawTx);

            //    const txHash = rawTx
           //     await connection.sendRawTransaction(txHash);
                console.log('Sending...');
           //    const account = await program.account.fundraiser.fetch(fundraiserPDA);
           //     console.log("Added a new Fundraiser", account.fundraiser[0]);
          //      console.log(tx);

               const result = await connection.confirmTransaction(tx);
//
                 if (result?.value.err) {
                   return { err: 1 };
                } else {
                   return method;
               }


           } catch(error) {
                console.log(error);
            } finally {
                setTransactionPending(false);
            };

        };
    }


    return (
        <StockpileContext.Provider 
            value={{
                program,
                publicKey,
                PROGRAM_ID,
                getAllFundraisers,
                createFundraiser,
                transactionPending,
                setTransactionPending,
            }}
        >
            {children}
        </StockpileContext.Provider>    
    )
}