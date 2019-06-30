import React from 'react';
import { TooltipProps } from 'react-native-ui-kitten';
import { TooltipShowcase } from './tooltipShowcase.component';

type TooltipElement = React.ReactElement<TooltipProps>;

export const TopTooltip = (): TooltipElement => {
  return (
    <TooltipShowcase placement='top'/>
  );
};
