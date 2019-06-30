import React from 'react';
import {
  Button,
  ButtonProps,
} from 'react-native-ui-kitten';

type ButtonElement = React.ReactElement<ButtonProps>;

export const WhiteButton = (props?: ButtonProps): ButtonElement => {
  return (
    <Button
      status='white'
      {...props}>
      BUTTON
    </Button>
  );
};
