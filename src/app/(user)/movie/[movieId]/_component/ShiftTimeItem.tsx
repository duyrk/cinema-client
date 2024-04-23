import { Button } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';
export interface IShiftTimeItemData {
  dateTime: string;
  showTimeId: number;
}
export interface ShiftTimeItem {
  onClick?: (timeStartText: string) => void;
  data: IShiftTimeItemData;
}
const ShiftTimeItem: React.FC<ShiftTimeItem> = (props) => {
  const { data, onClick } = props;
  const convertDateTime = (dateTime: string) => {
    const dayjsObject = dayjs(dateTime);
    const hour = dayjsObject.hour();
    const minute = dayjsObject.format('mm');

    return { hour, minute };
  };
  return (
    <Button variant="outline" onClick={()=>{onClick?.(`${convertDateTime(data.dateTime).hour}:${
      convertDateTime(data.dateTime).minute
    }`)}}>{`${convertDateTime(data.dateTime).hour}:${
      convertDateTime(data.dateTime).minute
    }`}</Button>
  );
};
export default ShiftTimeItem;
