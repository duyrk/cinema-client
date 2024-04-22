import { useForm } from '@mantine/form';
import { useState } from 'react';
import { NumberInput, TextInput, Button, ScrollArea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';

export default function MoveForm() {
    const [scrolled, setScrolled] = useState(false);
    const form = useForm({
      mode: 'uncontrolled',
      initialValues: { name: '', description: '',genre: '', duration: '', director: '', actor: '', releaseDate: '', endDate: '', ageRestriction: '', trailer: '', status: 0, thumbnail: ''},
  
      // functions will be used to validate values at corresponding key
      validate: {
        name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
        description: (value) => (value.length < 2 ? 'Description must have at least 2 letters' : null),
        genre: (value) => (value.length < 2 ? 'Gernre must have at least 2 letters' : null),
        duration: (value) => (value.length < 2 ? 'Duration must have at least 2 letters' : null),
        director: (value) => (value.length < 2 ? 'Director must have at least 2 letters' : null),
        actor: (value) => (value.length < 2 ? 'Actor must have at least 2 letters' : null),
        ageRestriction: (value) => (value.length < 2 ? 'Age Restriction must have at least 2 letters' : null),
        trailer: (value) => (value.length < 2 ? 'Trailer must have at least 2 letters' : null),
        thumbnail: (value) => (value.length < 2 ? 'Thumbnail must have at least 2 letters' : null),
        releaseDate: (value) => {
            if (!value) return 'Release Date is required';
            const selectedDate = new Date(value);
            const today = new Date();
            if (selectedDate < today) {
              return 'Release Date must be after or today';
            }
            return null; 
          },
      
          endDate: (value, values) => {
            if (!value) return 'End Date is required';
            if (!values.releaseDate) return 'Please select Release Date first';
            const selectedEndDate = new Date(value);
            const selectedReleaseDate = new Date(values.releaseDate);
            if (selectedEndDate <= selectedReleaseDate) {
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
        <TextInput ml="sm" mt="sm" label="Name" placeholder="Name" {...form.getInputProps('name')} />
        <TextInput ml="sm" mt="sm" mr ="lg" label="Description" placeholder="Description" {...form.getInputProps('description')} />
        <TextInput ml="sm" mt="sm" mr ="lg" label="Genre" placeholder="Genre" {...form.getInputProps('genre')} />
        <TextInput ml="sm" mt="sm" mr ="lg" label="Duration" placeholder="Duration" {...form.getInputProps('duration')} />
        <TextInput ml="sm" mt="sm" mr ="lg" label="Director" placeholder="Director" {...form.getInputProps('director')} />
        <TextInput ml="sm" mt="sm" mr ="lg" label="Actor" placeholder="Actor" {...form.getInputProps('actor')} />
        <DateTimePicker withSeconds ml="sm" mt="sm" mr ="lg" label="ReleaseDate" placeholder="Pick date and time" {...form.getInputProps('releaseDate')} />
        <DateTimePicker withSeconds ml="sm" mt="sm" mr ="lg" label="EndDate" placeholder="Pick date and time" {...form.getInputProps('endDate')}/>
        <TextInput ml="sm" mt="sm" mr ="lg" label="AgeRestriction" placeholder="AgeRestriction" {...form.getInputProps('ageRestriction')} />
        <TextInput ml="sm" mt="sm" mr ="lg" label="Trailer" placeholder="Trailer" {...form.getInputProps('trailer')} />
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
        <TextInput ml="sm" mt="sm" mr="lg" label="Thumbnail" placeholder="Thumbnail" {...form.getInputProps('thumbnail')} />
        
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