import { useForm } from '@mantine/form';
import { useState } from 'react';
import { NumberInput, TextInput, Button, ScrollArea } from '@mantine/core';

export default function RoomForm() {
    const [scrolled, setScrolled] = useState(false);
    const form = useForm({
      mode: 'uncontrolled',
      initialValues: {status: 0, roomType: ''},
      
      validate: {
        roomType: (value) => (value.length < 2 ? 'roomType must have at least 2 letters' : null),
          status: (value) => {
            if (value !== 0 && value !== 1 && value !== 2) {
              return 'Status must be either 0,1 or 2';
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
        <TextInput ml="sm" mt="lg" label="Id" placeholder="Id" readOnly mr="lg" />
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
          label="SeatQuantity"
          placeholder="SeatQuantity"
          min={0}
          max={1}
          readOnly
        />
        <TextInput ml="sm" mt="lg" mr="lg" label="roomType" placeholder="roomType" readOnly {...form.getInputProps('roomType')}/>
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