import React from "react";
import {
  Stack,
  Text,
  TextField,
  FontWeights,
  Button,
  ButtonType
} from "office-ui-fabric-react";

const boldStyle = { root: { fontWeight: FontWeights.semibold } };
export default module.exports;

export const LoginView: React.FunctionComponent = () => {
  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={{
        root: {
          width: "960px",
          margin: "0 auto",
          textAlign: "center",
          color: "#605e5c"
        }
      }}
      gap={15}
    >
      {
        <div>
          <TextField label="Log in to submit a vote" placeholder="Email"/>
          <p></p>
          <Button buttonType={ ButtonType.primary }>Log In</Button>
        </div>
      }
    </Stack>
  );
};
