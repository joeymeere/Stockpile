import React from 'react';
import { createContext, useContext, useMemo, useEffect, useState } from 'react';
import * as anchor from '@project-serum/anchor';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { IDL } from '../utils/stockpile'
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
//import * as borsh from 'borsh';
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

    constructor(beneficiary, creator, name, description, imageLink, contactLink, websiteLink, raised) {
        this.beneficiary = beneficiary;
        this.creator = creator;
        this.name = name;
        this.description = description;
        this.imageLink = imageLink;
        this.contactLink = contactLink;
        this.websiteLink = websiteLink;
        this.raised = raised;
    }

    static borshSchema = borsh.struct([
        borsh.publicKey('beneficiary'),
        borsh.str('creator'),
        borsh.str('websiteLink'),
        borsh.str('name'),
        borsh.str('description'),
        borsh.str('imageLink'),
        borsh.str('contactLink'),
        borsh.u8('raised'),
    ])

           static deserialize(buffer) {
            if (!buffer) {
                return null
            }
            try {
                const { beneficiary, creator, name, description, imageLink, contactLink, websiteLink, raised } = this.borshSchema.decode(buffer)
                return new Fundraiser(beneficiary, creator, name, description, imageLink, contactLink, websiteLink, raised)
            } catch(error) {
                console.log('Deserialization error:', error)
                return null
            }
        } 
     }

export const StockpileProvider = ({children}) => {

    const [ fundraisers, setFundraisers ] = useState();
    const [ initialized, setInitialized ] = useState(false);
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
                    const [userPDA] = await findProgramAddressSync([utf8.encode('fuckItWeBall'), publicKey.toBuffer()], program.programId)
                    const userFundraisers = await program.account.fundraiser.fetch(userPDA)

                    setInitialized(true);

                    console.log(userFundraisers);

                } catch(err) {
                    console.log(err)

                }
            }
        }
        start()
        }, [program, publicKey]
    )

    const getProgramDerivedFundraiserAddress = async (name) => {
        const [fundraiserPDA, bump] = await PublicKey.findProgramAddress(
            [utf8.encode(name), publicKey.toBuffer()],
            program.programId
        );
      
        console.log(`Got ProgramDerivedAddress: bump: ${bump}, pubkey: ${fundraiserPDA.toBase58()}`);
        return { fundraiserPDA, bump };
    };

    const getProgramDerivedUserAddress = async (username) => {
        const [userPDA, bump] = await PublicKey.findProgramAddress(
            [utf8.encode('fuckItWeBall!'), publicKey.toBuffer()],
            program.programId
        );
      
        console.log(`Got ProgramDerivedAddress: bump: ${bump}, pubkey: ${userPDA.toBase58()}`);
        return { userPDA, bump };
    };

    const getAllFundraisers = async () => {

            connection.getProgramAccounts(new web3.PublicKey(PROGRAM_ID)).then(async (accounts) => {
                const fundraisers = accounts.reduce((accum, { pubkey, account }) => {
                const fundraiser = borsh.deserializeUnchecked(Fundraiser.borshSchema, Fundraiser, account.data)
                console.log(fundraiser);
                    if (!fundraiser) {
                        return accum
                    }
                return [...accum, fundraiser, fundraisers]
        },[])
      }
    )}
    

    const create = async (username, name, description, websiteLink, contactLink, imageLink) => {
        console.log("CREATING FUNDRAISER...")

        if(program && publicKey) {
            setTransactionPending(true);

                console.log("FINDING PROGRAM ADDRESS...");
                const { fundraiserPDA, bump } = await getProgramDerivedFundraiserAddress(name);
                const { userPDA, userbump } = await getProgramDerivedUserAddress(username);

                console.log("SENDING TRANSACTION...");

                const transaction = new Transaction()

                const userCreate = await program.methods.createUser(username)
                        .accounts({
                            userAccount: userPDA,
                            authority: anchorWallet.publicKey,
                            systemProgram: SystemProgram.programId,
                        })
                .instruction()

                const fundraiserCreate = await program.methods.createFundraiser(name, description, imageLink, contactLink, websiteLink)
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

                const tx = await anchorWallet.signTransaction(transaction);

                const buffer = tx.serialize().toString('base64');

                console.log('Sending...');

                try {
                    let txid = await connection.sendEncodedTransaction(buffer);
                    toast.success('Successfully Created Fundraiser!');
                    console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
                } catch (e) {
                    console.log(JSON.stringify(e))
                    alert(JSON.stringify(e))
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
                create,
                transactionPending,
                setTransactionPending,
            }}
        >
            {children}
        </StockpileContext.Provider>    
    )
}