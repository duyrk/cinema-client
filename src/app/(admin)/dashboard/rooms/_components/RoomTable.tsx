import cx from 'clsx';
import { useState, useEffect } from 'react';
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
import { RoomService } from '@services/RoomService';
interface Row {
  roomId: number;
  status: number;
  seatQuantity: number;
  roomType: string;
}

export default function TableScrollArea() {
    const [scrolled, setScrolled] = useState(false);
    const theme = useMantineTheme();
    const [isUpdate, setUpdate] = useState(false);
    const [rooms, setrooms] = useState<IRoomResponse>();
    useEffect(() => {
      fetchRoom();
  }, []);

  const fetchRoom = async () => {
    try {
        const roomResponse = await RoomService.getAllRoom();
        setrooms(roomResponse.data);
    } catch (error) {
        console.error("There is error when fetching data:", error);
    }
};
const updateRoom = async (roomId: string, body: IRoomRequest) => {
  try {
    const response =await RoomService.updateRoom(roomId, body);
    console.log('Room updated successfully:', response);
    fetchRoom();
  } catch (error) {
    console.error('Failed to update room:', error);
  }
}
const deleteRoom = async (movieId: string) => {
  try {
    const response = await RoomService.deleteRoom(movieId);
    console.log('Room deleted successfully:', response);
    fetchRoom();
  } catch (error) {
    console.error('Failed to delete room:', error);
  }
}

const handleSubmitChange = async () => {
  // event.preventDefault(); // Ngăn chặn việc gửi form một cách mặc định
    const formData = {
      status: form.values.status,
      roomType: form.values.roomType,
    };
    form.reset();
    updateRoom(form.values.roomId.toString(), formData);
};
const handleSubmit = async () => {
  // event.preventDefault(); // Ngăn chặn việc gửi form một cách mặc định

  try {
    const formData = {
      status: form.values.status,
      roomType: form.values.roomType,
    };

    // Gọi API POST để tạo mới dữ liệu
    const response = await RoomService.addRoom(formData);

    // Xử lý kết quả trả về từ API, ví dụ hiển thị thông báo thành công
    console.log('Room created successfully:', response);
    // Thực hiện các hành động tiếp theo sau khi tạo thành công (nếu cần)

    // Đặt lại form sau khi gửi thành công (nếu cần)
    form.reset();
    fetchRoom();
  } catch (error) {
    // Xử lý lỗi khi gọi API, ví dụ hiển thị thông báo lỗi
    console.error('Error creating room:', error);
    // Thực hiện các hành động xử lý lỗi (nếu cần)
  }
};
    const form = useForm({
      mode: 'uncontrolled',
      initialValues: {roomId: 0,status: 0, roomType: '',seatQuantity: 0},
      
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
      setUpdate(false);
        // Gọi phương thức reset của đối tượng form
        form.reset();
      };
      const handleDeletRoomClick = (roomId: number) => {
        deleteRoom(roomId.toString());
      };

      const handleTableRowClick = (row: Row) => {
        setUpdate(true);
        form.setValues({
          roomId: row.roomId,
          status: row.status,
          roomType: row.roomType,
          seatQuantity: row.seatQuantity
        })

      };

    const rows = rooms?.data.map((row) => (
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
            onClick={() => handleDeletRoomClick(row.roomId)}
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
            <form  onSubmit={form.onSubmit(isUpdate ? handleSubmitChange : handleSubmit)}>
        <TextInput ml="sm" mt="lg" label="Id" placeholder="Id" readOnly mr="lg" {...form.getInputProps('roomId')} />
        <NumberInput
          mt="sm"
          ml="sm"
          mr="lg"
          label="Status"
          placeholder="Status"
          min={0}
          max={2}
          {...form.getInputProps('status')}
        />
        <NumberInput
          mt="sm"
          ml="sm"
          mr="lg"
          label="SeatQuantity"
          placeholder="SeatQuantity"
          min={0}
          readOnly
          {...form.getInputProps('seatQuantity')}
        />
        <TextInput ml="sm" mt="lg" mr="lg" label="roomType" placeholder="roomType" {...form.getInputProps('roomType')}/>
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