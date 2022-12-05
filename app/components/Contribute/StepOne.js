import React, { useState } from "react";
import { Chip, Group } from '@mantine/core';


const ContributeOne = (props) => {

    const { /*selectedType*/ setSelectedType, onContinue } = props;

const [value, setValue] = useState('');

return (
    <>
    <div className="place-content-center">
    <Group pb="xl" position="center">
      <h2 className="font-bold">Select Contribution Type</h2>
        </Group>
        <Group position="center">
        <Chip.Group position="center" defaultChecked={false} value={value} onChange={setValue} multiple={false}>
        <Chip variant="filled" size="lg" radius="xl" color="orange" value="2" onClick={() => setSelectedType("2")}>Standard</Chip>
        <Chip variant="filled" size="lg" radius="xl" color="orange" value="3" onClick={() => setSelectedType("3")}>Yield</Chip>
        </Chip.Group>
        </Group>
        <Group pt="xl" pb="md" position="center">
      <button onClick={onContinue} className="w-sm">Continue</button>
    </Group>
    </div>
    </>
)
}


export default ContributeOne;