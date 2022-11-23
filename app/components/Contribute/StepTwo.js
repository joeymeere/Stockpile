import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Input } from '@mantine/core';
import { Group, LoadingOverlay } from "@mantine/core";

const ContributeTwo = (props) => {

  const { selectedType, setSelectedType, onContinue } = props;

  const [visible, setVisible] = useState(false);
  const amount = useRef(null);

return (
    <>
     <Group pb="lg" position="center">
     <LoadingOverlay loaderProps={{color: "orange"}} radius="lg" visible={visible} overlayBlur={2} />
    <h2 className="font-bold pb-">Input Amount</h2>
    </Group>
    <Group pb="md" position="center">
    <Input
      placeholder="Enter SOL Amount..."
      radius="lg"
      size="md"
      ref={amount}
    />
    <br></br>
      <button onClick={() => setVisible((v) => !v)} className="w-sm">Contribute</button>
    </Group>
    </>
)
}

export default ContributeTwo;