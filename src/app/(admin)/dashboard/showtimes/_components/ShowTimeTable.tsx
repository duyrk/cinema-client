import cx from 'clsx';
import { useState } from 'react';
import { Table, ScrollArea, Box } from '@mantine/core';
import classes from '../_styles/TableScrollArea.module.css';
import { Button, Menu, Text, rem, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NumberInput, TextInput} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';


import {
  IconChevronDown,
  IconHttpDelete,
  IconHttpPut,
} from '@tabler/icons-react';

const data = [
    {
        showTimeId: 1,
        timeStart: "2024-04-20T09:00:00.000+00:00",
        timeEnd: "2024-04-20T12:00:00.000+00:00",
        status: 1,
        movieId: 1,
        roomId: 1
    },
    {
        showTimeId: 2,
        timeStart: "2024-04-20T09:00:00.000+00:00",
        timeEnd: "2024-04-20T12:00:00.000+00:00",
        status: 1,
        movieId: 2,
        roomId: 2
    },
    {
        showTimeId: 3,
        timeStart: "2024-04-20T12:00:00.000+00:00",
        timeEnd: "2024-04-20T15:00:00.000+00:00",
        status: 1,
        movieId: 3,
        roomId: 1
    },
    {
        showTimeId: 4,
        timeStart: "2024-04-20T12:00:00.000+00:00",
        timeEnd: "2024-04-20T15:00:00.000+00:00",
        status: 1,
        movieId: 4,
        roomId: 2
    },
    {
        showTimeId: 5,
        timeStart: "2024-04-20T12:00:00.000+00:00",
        timeEnd: "2024-04-20T15:00:00.000+00:00",
        status: 1,
        movieId: 3,
        roomId: 1
    },
    {
        showTimeId: 6,
        timeStart: "2024-04-20T12:00:00.000+00:00",
        timeEnd: "2024-04-20T15:00:00.000+00:00",
        status: 1,
        movieId: 4,
        roomId: 2
    },
    {
        showTimeId: 7,
        timeStart: "2024-04-20T12:00:00.000+00:00",
        timeEnd: "2024-04-20T15:00:00.000+00:00",
        status: 1,
        movieId: 3,
        roomId: 1
    },
    {
        showTimeId: 8,
        timeStart: "2024-04-20T12:00:00.000+00:00",
        timeEnd: "2024-04-20T15:00:00.000+00:00",
        status: 1,
        movieId: 4,
        roomId: 2
    },
    
]

export default function TableScrollArea() {
    const [scrolled, setScrolled] = useState(false);
    const theme = useMantineTheme();

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

    const rows = data.map((row) => (
      <Table.Tr key={row.showTimeId}>
      <Table.Td>{row.showTimeId}</Table.Td>
        <Table.Td>{row.timeStart}</Table.Td>
        <Table.Td>{row.timeEnd}</Table.Td>
        <Table.Td>{row.status}</Table.Td>
        <Table.Td>{row.movieId}</Table.Td>
        <Table.Td>{row.roomId}</Table.Td>
        <Table.Td><Menu
        transitionProps={{ transition: 'pop-top-right' }}
        position="top-end"
        width={220}
        withinPortal
      > 
        <Menu.Target>
          <Button
            rightSection={
              <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            }
            pr={12}
          >
            Action
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconHttpPut
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            }
            rightSection={
              <Text size="xs" tt="uppercase" fw={700} c="dimmed">
              </Text>
            }
          >
            Update
          </Menu.Item >
          <Menu.Item
            leftSection={
              <IconHttpDelete
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.pink[6]}
                stroke={1.5}
              />
            }
            rightSection={
              <Text size="xs" tt="uppercase" fw={700} c="dimmed">
              </Text>
            }
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      </Table.Td>
      </Table.Tr>
    ));
  
    return (
      <Box>
        <ScrollArea miw={300} h={350} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>timeStart</Table.Th>
            <Table.Th>timeEnd</Table.Th>
            <Table.Th>status</Table.Th>
            <Table.Th>movieId</Table.Th>
            <Table.Th>roomId</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
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
    </Box>
      
    );
  }