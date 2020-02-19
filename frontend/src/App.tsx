import React from 'react';
import { Stack, Text, Link, FontWeights, Slider, DefaultPalette} from 'office-ui-fabric-react';
import {UserSubmissionPage} from './components/UserSubmissionPage';

const boldStyle = { root: { fontWeight: FontWeights.semibold } };

export const App: React.FunctionComponent = () => {
  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={{
        root: {
          width: '500px',
          margin: '0 auto',
          textAlign: 'center',
          color: '#605e5c'
        }
      }}
      gap={15}
    >
      <UserSubmissionPage/>
    </Stack>
  );
};

