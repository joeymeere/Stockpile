import React, { useState } from "react";
import toast from "react-hot-toast";
import { Group, LoadingOverlay } from "@mantine/core";
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

import { useStockpile } from "../Context";
import { useStateContext } from "../state";

const WithdrawOne = () => {

  const { connection, publicKey, withdraw } = useStockpile();
  const { currentAmount, updateCurrentAmount } = useStateContext();

  const [visible, setVisible] = useState(false);
  const [opened, setOpened] = useState(false);

  const balance = () => {
    connection.getBalance(publicKey).then((bal) => {
        const userBalance = bal/LAMPORTS_PER_SOL;
        console.log(userBalance);
        return userBalance;
      });
  };

return (
    <>
     <Group pb="lg" position="center">
     <LoadingOverlay loaderProps={{color: "orange"}} radius="lg" visible={visible} overlayBlur={2} onClick={() => setVisible(false)} />
    <h2 className="font-bold pb-">Input Withdraw Amount</h2>
    </Group>
    <Group pb="md" position="center">
    <input
      name="amount"
      type="number"
      pattern="^\d+(?:\.\d{1,2})?$"
      placeholder="Enter a SOL amount..."
      min={0.01}
      value={currentAmount}
      onChange={(e) => updateCurrentAmount(Number(e.target.value))}
      className="enabled:active:border-orange-400"
      required />
    <p>◎ = {String(balance).slice(0, 4)} SOL</p>
    <button onClick={async () => {setVisible((v) => !v)
      console.log(currentAmount);
          await toast.promise(
            withdraw(currentAmount),
             {
               loading: 'Submitting...',
               success: <b>Successfully Withdrawn {currentAmount} SOL!</b>,
               error: <b>Transaction Failed.</b>,
             }
           );
          setVisible(false);
          setOpened(false);
        }} 
        className="w-sm">Withdraw</button>
    </Group>
    </>
)
}

export default WithdrawOne;