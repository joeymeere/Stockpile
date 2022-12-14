import React, { useState } from "react";
import toast from "react-hot-toast";
import { Input } from '@mantine/core';
import { Group, LoadingOverlay } from "@mantine/core";

import { useStockpile } from "../Context";
import { useStateContext } from "../state";

const ContributeTwo = () => {

  const { contribute } = useStockpile();
  const { currentAmount, updateCurrentAmount } = useStateContext();

  const [visible, setVisible] = useState(false);

return (
    <>
     <Group pb="lg" position="center">
     <LoadingOverlay loaderProps={{color: "orange"}} radius="lg" visible={visible} overlayBlur={2} onClick={() => setVisible(false)} />
    <h2 className="font-bold pb-">Input Amount</h2>
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
    <button onClick={async () => {setVisible((v) => !v)
      console.log(currentAmount);
          await toast.promise(
            contribute(currentAmount),
             {
               loading: 'Submitting...',
               success: <b>Successfully Contributed {currentAmount} SOL!</b>,
               error: <b>Transaction Failed.</b>,
             }
           );
          setVisible(false);
        }} 
        className="w-sm">Contribute</button>
    </Group>
    </>
)
}

export default ContributeTwo;