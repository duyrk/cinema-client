import cx from 'clsx';
import { useState } from 'react';
import { Table, ScrollArea, Box } from '@mantine/core';
import classes from '../_styles/TableScrollArea.module.css';
import { Button, Menu, Text, rem, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NumberInput, TextInput } from '@mantine/core';
import {
  IconChevronDown,
  IconHttpDelete,
  IconHttpPut,
} from '@tabler/icons-react';

const data =  [
    {
        roomId: 2,
        status: 2,
        seatQuantity: 10,
        roomType: "Cheap"
    },
    {
        roomId: 1,
        status: 2,
        seatQuantity: 10,
        roomType: "VIP"
    }
];

export default function TableScrollArea() {
    const [scrolled, setScrolled] = useState(false);
    const theme = useMantineTheme();

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

    const rows = data.map((row) => (
      <Table.Tr key={row.roomId} >
        <Table.Td >{row.roomId}</Table.Td>
      <Table.Td  >{row.status}</Table.Td>
        <Table.Td >{row.seatQuantity}</Table.Td>
        <Table.Td >{row.roomType}</Table.Td>
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
              <Table.Th>status</Table.Th>
              <Table.Th>seatQuantity</Table.Th>
              <Table.Th>roomType</Table.Th>
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
      </Box>
      
    );
  }