import React from 'react';
import { PopoverProps } from 'react-native-ui-kitten';
import { PopoverShowcase } from './popoverShowcase.component';

type PopoverElement = React.ReactElement<PopoverProps>;

export const LeftStartPopover = (): PopoverElement => {
  return (
    <PopoverShowcase placement='left start'/>
  );
};
