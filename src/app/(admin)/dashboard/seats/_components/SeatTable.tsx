import cx from 'clsx';
import { useState } from 'react';
import { Table, ScrollArea, Box } from '@mantine/core';
import classes from '../_styles/TableScrollArea.module.css';
import { Button, Menu, Text, rem, useMantineTheme } from '@mantine/core';
import { NumberInput, TextInput} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconChevronDown,
  IconHttpDelete,
  IconHttpPut,
} from '@tabler/icons-react';

const data =  [
    {
        seatId: 1,
        seatNumber: "A1",
        seatStatus: 1,
        seatType: "Ghe Don",
        roomId: 1,
    },
    {
        seatId: 2,
        seatNumber: "A2",
        seatStatus: 1,
        seatType: "Ghe Don",
        roomId: 1,
    },
    {
        seatId: 3,
        seatNumber: "A3",
        seatStatus: 1,
        seatType: "Ghe Don",
        roomId: 1,
    },
];

interface Row {
    seatId: number;
    seatNumber: string;
    seatStatus: number;
    seatType: string;
    roomId: number;
}

export default function TableScrollArea() {
    const [scrolled, setScrolled] = useState(false);
    const theme = useMantineTheme();

    const [isUpdate, setUpdate] = useState(false);
    const form = useForm({
      mode: 'uncontrolled',
      initialValues: {seatId: 0 ,seatStatus: 0, roomId: 0, seatNumber: '', seatType: ''},
      
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
      setUpdate(false);
        // Gọi phương thức reset của đối tượng form
        form.reset();
      };
    
      const handleTableRowClick = (row: Row) => {
        setUpdate(true);
        form.setValues({
          seatId: row.seatId,
          seatStatus: row.seatStatus,
          roomId: row.roomId,
          seatNumber: row.seatNumber,
          seatType: row.seatType
        })

      };


    const rows = data.map((row) => (
      <Table.Tr key={row.seatId} >
        <Table.Td >{row.seatId}</Table.Td>
      <Table.Td  >{row.seatNumber}</Table.Td>
      <Table.Td  >{row.seatStatus}</Table.Td>
        <Table.Td >{row.seatType}</Table.Td>
        <Table.Td>{row.roomId}</Table.Td>
        <Table.Td ><Menu
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
            onClick={() => handleTableRowClick(row)}
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
              <Table.Th>SeatNumber</Table.Th>
              <Table.Th>SeatStaus</Table.Th>
              <Table.Th>SeatType</Table.Th>
              <Table.Th>RoomId</Table.Th>
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
        <TextInput ml="sm" mt="lg" label="Id" placeholder="Id" readOnly mr="lg"  {...form.getInputProps('seatId')}/>
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
          min={1}
          {...form.getInputProps('roomId')}
        />
        <Button color={isUpdate ? 'yellow' : 'cyan'} ml="sm" mt="lg" mb="lg" type="submit">
        {isUpdate ? 'Update' : 'Create'}
        </Button>
        <Button color='blue' ml="sm" mt="lg" mb="lg" type="reset" onClick={handleReset}>
          Reset
        </Button>
        </form>
        </ScrollArea>
      </Box>
    );
  }