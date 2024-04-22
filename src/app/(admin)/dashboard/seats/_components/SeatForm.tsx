import { useForm } from '@mantine/form';
import { useState } from 'react';
import { NumberInput, TextInput, Button, ScrollArea } from '@mantine/core';

export default function SeatForm() {
    const [scrolled, setScrolled] = useState(false);
    const form = useForm({
      mode: 'uncontrolled',
      initialValues: {seatStatus: 0, roomId: 0, seatNumber: '', seatType: ''},
      
      validate: {
        seatType: (value) => (value.length < 2 ? 'SeatType must have at least 2 letters' : null),
        seatStatus: (value) => {
            if (value !== 0 && value !== 1 && value !== 2) {
              return 'Status must be either 0,1 or 2';
            }
            return null; 
          },

        seatNumber: (value) => (value.length < 2 ? 'SeatNumber must have at least 2 letters' : null),
        roomId: (value) => {
            if (value === 0) {
              return 'roomId must not be 0';
            }
            return null; 
          },     },
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
        <TextInput ml="sm" mt="lg" label="Id" placeholder="Id" readOnly mr="lg" />
        <TextInput ml="sm" mt="lg" label="SeatNumber" placeholder="SeatNumber" mr="lg"  {...form.getInputProps('seatNumber')}/>
        <NumberInput
          mt="sm"
          ml="sm"
          mr="lg"
          label="Status"
          placeholder="Status"
          min={0}
          max={1}
          {...form.getInputProps('seatStatus')}
        />
        <TextInput ml="sm" mt="lg" label="SeatType" placeholder="SeatType" mr="lg" {...form.getInputProps('seatType')} />
        <NumberInput
          mt="sm"
          ml="sm"
          mr="lg"
          label="RoomId"
          placeholder="RoomId"
          min={0}
          max={1}
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