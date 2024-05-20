'use client';

import { Box, Stack, Text } from '@mantine/core';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/vi';
import React from 'react';
dayjs.locale('vi');
export interface IShowTimeData {
  dateTime: string;
}
export interface ShowTime {
  isActive: boolean;
  onClick?: () => void;
  data: IShowTimeData;
}
const ShowTime: React.FC<ShowTime> = (props) => {
  const { isActive = false, data, onClick } = props;
  const convertDateTime = (dateTime: string) => {
    const dayjsObject = dayjs(dateTime);
    const day = dayjsObject.date();
    const month = dayjsObject.month() + 1;
    const year = dayjsObject.year();
    const dayOfWeek = dayjsObject.format('dddd');
    return { day, month, year, dayOfWeek };
  };
  return (
    <Box onClick={onClick} className="cursor-pointer">
      <Stack align="center" bg={isActive ? 'red.8' : ''} px={15} py={5}>
        <Text fw={500}>Th. {convertDateTime(data.dateTime).month}</Text>
        <Text className="text-3xl" fw={700}>
          {convertDateTime(data.dateTime).day}
        </Text>
        <Text fw={500}>{convertDateTime(data.dateTime).dayOfWeek}</Text>
      </Stack>
    </Box>
  );
};
export default ShowTime;
