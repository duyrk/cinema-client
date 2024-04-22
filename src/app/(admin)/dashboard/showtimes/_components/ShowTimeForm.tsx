import { useForm } from '@mantine/form';
import { useState } from 'react';
import { NumberInput, TextInput, Button, ScrollArea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';

export default function ShowTimeForm() {
    const [scrolled, setScrolled] = useState(false);
    const form = useForm({
      mode: 'uncontrolled',
      initialValues: {timeStart: '', timeEnd: '', status: 0, movieId: 0, roomId: 0},
  
      // functions will be used to validate values at corresponding key
      validate: {
        timeStart: (value) => {
            if (!value) return 'Release Date is required';
            const selectedDate = new Date(value);
            const today = new Date();
            if (selectedDate < today) {
              return 'Release Date must be after or today';
            }
            return null; 
          },
      
          timeEnd: (value, values) => {
            if (!value) return 'End Date is required';
            if (!values.timeStart) return 'Please select Release Date first';
            const selectedtimeEnd = new Date(value);
            const selectedtimeStart = new Date(values.timeStart);
            if (selectedtimeEnd <= selectedtimeStart) {
              return 'End Date must be after Release Date';
            }
            return null; 
          },

          status: (value) => {
            if (value !== 0 && value !== 1) {
              return 'Status must be either 0 or 1';
            }
            return null; 
          },
          movieId: (value) => {
            if (value === 0) {
              return 'movieId must not be 0';
            }
            return null; 
          },
          roomId: (value) => {
            if (value === 0) {
              return 'roomId must not be 0';
            }
            return null; 
          },
      },
    });
    const handleReset = () => {
        // Gọi phương thức reset của đối tượng form
        form.reset();
      };
  
    return (
        <ScrollArea style={{ 
            justifyContent: 'center',
            alignItems: 'center',}
    } miw={200} h={350} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <form  onSubmit={form.onSubmit(console.log)}>
        <TextInput ml="sm" mt="lg" label="Id" placeholder="Id" readOnly />
        <DateTimePicker withSeconds ml="sm" mt="sm" mr ="lg" label="TimeStart" placeholder="Pick date and time" {...form.getInputProps('timeStart')} />
        <DateTimePicker withSeconds ml="sm" mt="sm" mr ="lg" label="TimeEnd" placeholder="Pick date and time" {...form.getInputProps('timeEnd')}/>
        <NumberInput
          mt="sm"
          ml="sm"
          mr="lg"
          label="Status"
          placeholder="Status"
          min={0}
          max={1}
          {...form.getInputProps('status')}
        />
        <NumberInput
          mt="sm"
          ml="sm"
          mr="lg"
          label="MovieId"
          placeholder="MovieId"
          min={1}
          {...form.getInputProps('movieId')}
        />
        <NumberInput
          mt="sm"
          ml="sm"
          mr="lg"
          label="RoomId"
          placeholder="RoomId"
          min={1}
          {...form.getInputProps('roomId')}
        />
        <Button color='cyan' ml="sm" mt="lg" mb="lg" type="submit">
          Submit
        </Button>
        <Button color='blue' ml="sm" mt="lg" mb="lg" type="reset" onClick={handleReset}>
          Reset
        </Button>
        </form>
        </ScrollArea>
    );
  }