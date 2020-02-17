import React from 'react';
import {Stack, FontWeights, Slider, Label, IStackItemStyles } from 'office-ui-fabric-react';

const boldStyle = { root: { fontWeight: FontWeights.semibold } };

const labelStyle : IStackItemStyles = {root : {justifyContent:'center'}};

export const SatisfactionSlider: React.FunctionComponent = () => {

  let values = ['Too Cold', 'A Bit Cold', 'Just Right', 'A Bit Hot', 'Too Hot'];

  return (
    <Stack
    horizontalAlign='center'
      styles={{
          root:{
            width:'100%'
          }
      }}
    >
      <Stack 
        horizontal 
        horizontalAlign='space-between'
        styles={{
          root:{
            width:'100%'
          }
        }}
      >
        <Stack.Item align='stretch' styles={{root:{width:'15%'}}}>
          <Stack>
            <Label styles={labelStyle}>Too Cold</Label>
            <Label styles={labelStyle}>|</Label>
          </Stack>
        </Stack.Item>
        <Stack.Item align='stretch' styles={{root:{width:'15%'}}}>
          <Stack>
            <Label styles={labelStyle}>A Bit Cold</Label>
            <Label styles={labelStyle}>|</Label>
          </Stack>
        </Stack.Item>
        <Stack.Item align='stretch' styles={{root:{width:'15%'}}}>
          <Stack>
            <Label styles={labelStyle}>Just Right</Label>
            <Label styles={labelStyle}>|</Label>
          </Stack>
        </Stack.Item>
        <Stack.Item align='stretch' styles={{root:{width:'15%'}}}>
          <Stack>
            <Label styles={labelStyle}>A Bit Hot</Label>
            <Label styles={labelStyle}>|</Label>
          </Stack>
        </Stack.Item>
        <Stack.Item align='stretch' styles={{root:{width:'15%'}}}>
          <Stack>
            <Label styles={labelStyle}>Too Hot</Label>
            <Label styles={labelStyle}>|</Label>
          </Stack>
        </Stack.Item>

      </Stack>
      <Stack
        styles={{
          root:{
            width:'88%'
          }
        }}
      >
          <Slider 
            min={-2} 
            max={2} 
            defaultValue={0} 
            originFromZero 
            showValue={false} 
            valueFormat={(value : number) => values[value + 2]}
          />
      </Stack>
    </Stack>
  );

};

