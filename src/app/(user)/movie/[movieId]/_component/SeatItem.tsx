import { Button, ColorSchemeScript, useMantineColorScheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import React from 'react';
export interface ISeatData {
  seatName: string;
  price: number;
}
export interface SeatItemProps {
  data: ISeatData;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
const SeatItem: React.FC<SeatItemProps> = (props) => {
  const { data, isActive = false, onClick, disabled = false } = props;
  const { colorScheme } = useMantineColorScheme();
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      bg={disabled ? 'yellow.6' : isActive ? 'white' : 'gray.8'}
      c={isActive ? 'gray.8' : 'white'}
    >
      {data.seatName}
    </Button>
  );
};
export default SeatItem;
