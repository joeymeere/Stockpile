import React, {useState} from 'react';
import { Group } from '@mantine/core';
import { useStateContext } from './state';

  export const Register = (props) => {

  const { /*selectedType*/ setSelectedType, onContinue } = props;

  const { currentCreator, updateCurrentCreator } = useStateContext();

return (
    <>
     <Group pb="lg" position="center">
      <h2 className="font-bold pb-">Specify a Username</h2>
     </Group>
     <Group pb="md" position="center">
        <input
          name="username"
          type="text"
          placeholder="Enter a username..."
          onChange={(e) => updateCurrentCreator(e.target.value)}
          className="enabled:active:border-orange-400"
          required />
        <button onClick={async () => {onContinue();
          console.log(currentCreator);
            }} 
            className="w-sm">Continue</button>
     </Group>
    </>
)
    }

export default Register;