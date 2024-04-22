import { Button, ColorSchemeScript, useMantineColorScheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import React from 'react';
export interface ISeatData {
  seatName: string;
  price: number
}
export interface SeatItemProps {
  data: ISeatData;
  isActive: boolean
  onClick?: () => void;
}
const SeatItem: React.FC<SeatItemProps> = (props) => {
  const { data, isActive =false , onClick } = props;
  const {  colorScheme } = useMantineColorScheme();
  return (
    <Button
      onClick={onClick}
      bg={isActive ? 'white' : 'gray.8'}
      c={isActive  ? 'gray.8' : 'white'}
    >
      {data.seatName}
    </Button>
  );
};
export default SeatItem;
