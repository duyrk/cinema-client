import cx from 'clsx';
import { useState } from 'react';
import { Table, ScrollArea } from '@mantine/core';
import classes from '../_styles/TableScrollArea.module.css';
import { Button, Menu, Text, rem, useMantineTheme } from '@mantine/core';
import MoveForm from './MovieForm';

import {
  IconChevronDown,
  IconHttpDelete,
  IconHttpPut,
} from '@tabler/icons-react';


const data = [
    {
      movieId: 1,
      movieName: "NGÀY TÀN CỦA ĐẾ QUỐC-T18",
      movieGenre: "Hành động",
      description: "Trong một tương lai gần, một nhóm các phóng viên chiến trường quả cảm phải đấu tranh với thời gian và bom đạn nguy hiểm để đến kịp Nhà Trắng giữa bối cảnh nội chiến Hoa Kỳ đang tiến đến cao trào.",
      duration: "1h 49m",
      director: "Alex Garland",
      actor: "Kirsten Dunst, Wagner Moura, Cailee Spaeny",
      releaseDate: "2024-04-20 00:00:00",
      endDate: "2024-05-20 00:00:00",
      ageRestriction: "T18 - PHIM ĐƯỢC PHỔ BIẾN ĐẾN NGƯỜI XEM TỪ ĐỦ 18 TUỔI TRỞ LÊN",
      urlTrailer: "https://www.youtube.com/embed/QGlgPf9jGMA?si=eudU9myRkAUs4AxC",
      status: 1,
      urlThumbnail: "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2F0017504_0.jpg&w=256&q=75"
    }
    
  ];

export default function TableScrollArea() {
    const [scrolled, setScrolled] = useState(false);
    const theme = useMantineTheme();

    const rows = data.map((row) => (
      <Table.Tr key={row.movieId}>
      <Table.Td>{row.movieId}</Table.Td>
        <Table.Td>{row.movieName}</Table.Td>
        <Table.Td>{row.description}</Table.Td>
        <Table.Td>{row.movieGenre}</Table.Td>
        <Table.Td>{row.duration}</Table.Td>
        <Table.Td>{row.director}</Table.Td>
        <Table.Td>{row.actor}</Table.Td>
        <Table.Td>{row.releaseDate}</Table.Td>
        <Table.Td>{row.endDate}</Table.Td>
        <Table.Td>{row.ageRestriction}</Table.Td>
        <Table.Td>{row.urlTrailer}</Table.Td>
        <Table.Td>{row.status}</Table.Td>
        <Table.Td>{row.urlThumbnail}</Table.Td>
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
      <ScrollArea miw={300} h={350} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table miw={700}>
          <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <Table.Tr>
              <Table.Th>Id</Table.Th>
              <Table.Th miw={150}>Name</Table.Th>
              <Table.Th miw={300}>Description</Table.Th>
              <Table.Th>Genre</Table.Th>
              <Table.Th>Duration</Table.Th>
              <Table.Th>Director</Table.Th>
              <Table.Th miw={150}>Actor</Table.Th>
              <Table.Th miw={120}>RelaseDate</Table.Th>
              <Table.Th miw={120}>EndDate</Table.Th>
              <Table.Th>AgeRestriction</Table.Th>
              <Table.Th>Trailer</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th miw={150}>Thumbnail</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    );
  }