import cx from 'clsx';
import { useState } from 'react';
import { Table, ScrollArea } from '@mantine/core';
import classes from '../_styles/TableScrollArea.module.css';
import { Button, Menu, Text, rem, useMantineTheme } from '@mantine/core';

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

export default function TableScrollArea() {
    const [scrolled, setScrolled] = useState(false);
    const theme = useMantineTheme();

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
    );
  }