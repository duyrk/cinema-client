import cx from 'clsx';
import { useState, useEffect } from 'react';
import { Table, ScrollArea, Box } from '@mantine/core';
import classes from '../_styles/TableScrollArea.module.css';
import { Button, Menu, Text, rem, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NumberInput, TextInput} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { format } from 'date-fns';
import { ShowtimeService } from '@services/ShowtimeService';
import {
  IconChevronDown,
  IconHttpDelete,
  IconHttpPut,
} from '@tabler/icons-react';

interface Row {
  showTimeId: number;
  timeStart: string;
  timeEnd: string;
  status: number;
  movieId: number;
  roomId: number;
}

export default function TableScrollArea() {
    const [scrolled, setScrolled] = useState(false);
    const theme = useMantineTheme();
    const [isUpdate, setUpdate] = useState(false);
    const [showtimes, setShowtimes] = useState<IShowtimeResponse>();
    useEffect(() => {
      fetchShowtime();
  }, []);
  const fetchShowtime = async () => {
    try {
        const showtimeResponse = await ShowtimeService.getAllShowtime();
        setShowtimes(showtimeResponse.data);
    } catch (error) {
        console.error("There is error when fetching data:", error);
    }
};
const updateShowtime = async (showTimeId: string, body: IShowtimeRequest) => {
  try {
    const response =await ShowtimeService.updateShowtime(showTimeId, body);
    console.log('Showtime updated successfully:', response);
    fetchShowtime();
  } catch (error) {
    console.error('Failed to update showtime:', error);
  }
}
const deleteShowtime = async (showTimeId: string) => {
  try {
    const response = await ShowtimeService.deleteShowtime(showTimeId);
    console.log('Showtime deleted successfully:', response);
    fetchShowtime();
  } catch (error) {
    console.error('Failed to delete showtime:', error);
  }
}
const handleSubmitChange = async () => {
  // event.preventDefault(); // Ngăn chặn việc gửi form một cách mặc định
    const timestart = form.values.timeStart;
    const formattedtimestart = format(timestart, 'yyyy-MM-dd HH:mm:ss');
    const timeendStr = form.values.timeEnd; 
    const formattedtimeend = format(timeendStr, 'yyyy-MM-dd HH:mm:ss');
    const formData = {
      timeStart: formattedtimestart,
      timeEnd: formattedtimeend,
      status: form.values.status,
      movieId: form.values.movieId,
      roomId: form.values.roomId
    };
    form.reset();
    updateShowtime(form.values.showTimeId.toString(), formData);
};
const handleSubmit = async () => {
  // event.preventDefault(); // Ngăn chặn việc gửi form một cách mặc định

  try {
    const timestart = form.values.timeStart;
    const formattedtimestart = format(timestart, 'yyyy-MM-dd HH:mm:ss');
    const timeendStr = form.values.timeEnd; 
    const formattedtimeend = format(timeendStr, 'yyyy-MM-dd HH:mm:ss');
    const formData = {
      timeStart: formattedtimestart,
      timeEnd: formattedtimeend,
      status: form.values.status,
      movieId: form.values.movieId,
      roomId: form.values.roomId
    };

    // Gọi API POST để tạo mới dữ liệu
    const response = await ShowtimeService.addShowtime(formData);

    // Xử lý kết quả trả về từ API, ví dụ hiển thị thông báo thành công
    console.log('Showtime created successfully:', response);
    // Thực hiện các hành động tiếp theo sau khi tạo thành công (nếu cần)

    // Đặt lại form sau khi gửi thành công (nếu cần)
    form.reset();
    fetchShowtime();
  } catch (error) {
    // Xử lý lỗi khi gọi API, ví dụ hiển thị thông báo lỗi
    console.error('Error creating showtime:', error);
    // Thực hiện các hành động xử lý lỗi (nếu cần)
  }
};
    const form = useForm({
      mode: 'uncontrolled',
      initialValues: {showTimeId: 0,timeStart: '', timeEnd: '', status: 0, movieId: 1, roomId: 1},
  
      // functions will be used to validate values at corresponding key
      validate: {
        timeStart: (value) => {
            if (!value) return 'Time start is required';
            const selectedDate = new Date(value);
            const today = new Date();
            if (selectedDate < today) {
              return 'TimeStart must be after or today';
            }
            return null; 
          },
      
          timeEnd: (value, values) => {
            if (!value) return 'Time end is required';
            if (!values.timeStart) return 'Please select Time start first';
            const selectedtimeEnd = new Date(value);
            const selectedtimeStart = new Date(values.timeStart);
            if (selectedtimeEnd <= selectedtimeStart) {
              return 'Time end must be after Time start';
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
      setUpdate(false);
        // Gọi phương thức reset của đối tượng form
        form.reset();
      };
      const handleDeletShowtimeClick = (showTimeId: number) => {
        deleteShowtime(showTimeId.toString());
      };

      const handleTableRowClick = (row: Row) => {
        setUpdate(true);
        const timeStart = new Date(row.timeStart);
        const timeEnd = new Date(row.timeEnd);
        form.setValues({
          showTimeId: row.showTimeId,
          timeStart: timeStart, // Chuyển đổi sang kiểu Date
          timeEnd: timeEnd, // Chuyển đổi sang kiểu Date
          status: row.status,
          movieId: row.movieId,
          roomId: row.roomId
        })
      };


    const rows = showtimes?.data.map((row) => (
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
            onClick={() => handleDeletShowtimeClick(row.showTimeId)}
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
            <form  onSubmit={form.onSubmit(isUpdate ? handleSubmitChange : handleSubmit)}>
        <TextInput ml="sm" mt="lg" label="Id" placeholder="Id" readOnly {...form.getInputProps('showTimeId')} />
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