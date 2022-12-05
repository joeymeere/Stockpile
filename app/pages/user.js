import React, { useEffect, useState } from 'react';
import CardSection from '../components/CardSection'
import { useStockpile } from '../components/Context';
import DashboardLayout from '../components/DashboardLayout'
import { IDL } from '../utils/stockpile'
import { useAnchorWallet, useWallet, useConnection } from '@solana/wallet-adapter-react';

const User = () => {

    const { initialized, program } = useStockpile();

    const { connection } = useConnection();
    const anchorWallet = useAnchorWallet();
    const { publicKey } = useWallet();
    const [ userFundraisers, setUserFundraisers ] = useState({});

    useEffect(() => {
        const search = async () => {
            try {
                const [userPDA, bump] = await PublicKey.findProgramAddress(
                    [utf8.encode('fuckItWeBall!'), publicKey.toBuffer()],
                    program.programId
                );
                const filterAccounts = await program.account.fundraiser.all([
                    {
                      memcmp: {
                        offset: 8,
                        bytes: creator.publicKey.toBase58(),
                      },
                    },
                  ])

                console.log(usersFundraisers);

                setUserFundraisers(usersFundraisers);

                return userFundraisers;
            } catch(err) {
                console.log(err);
            }
          }
         search();
        }, []
    );

  return (
    <DashboardLayout>
        {initialized ? (
            <div>
            <h1 className="pt-6"><strong>{userFundraisers.username}</strong></h1>
            <hr className="w-44"></hr>
            <p>Manage your user accound.</p>
            </div>
        ): (
            <p> Please create a user account. This can be done by connecting a wallet and creating a fundraiser or contributing to one.</p>
        )}
    </DashboardLayout>
  )
}

export default User;
