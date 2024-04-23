import cx from 'clsx';
import { useState, useEffect } from 'react';
import { Table, ScrollArea, Box } from '@mantine/core';
import classes from '../_styles/TableScrollArea.module.css';
import { Button, Menu, Text, rem, useMantineTheme } from '@mantine/core';
import { NumberInput, TextInput} from '@mantine/core';
import { useForm } from '@mantine/form';
import { SeatService } from '@services/SeatService';
import {
  IconChevronDown,
  IconHttpDelete,
  IconHttpPut,
} from '@tabler/icons-react';

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
    const [seats, setSeat] = useState<ISeatResponse>();
    useEffect(() => {
      fetchSeat();
  }, []);
  const fetchSeat = async () => {
    try {
        const seatResponse = await SeatService.getAllSeat();
        setSeat(seatResponse.data);
    } catch (error) {
        console.error("There is error when fetching data:", error);
    }
};
const updateSeat = async (seatId: string, body: ISeatRequest) => {
  try {
    const response =await SeatService.updateSeat(seatId, body);
    console.log('Seat updated successfully:', response);
    fetchSeat();
  } catch (error) {
    console.error('Failed to update seat:', error);
  }
}
const deleteSeat = async (seatId: string) => {
  try {
    const response = await SeatService.deleteSeat(seatId);
    console.log('Seat deleted successfully:', response);
    fetchSeat();
  } catch (error) {
    console.error('Failed to delete seat:', error);
  }
}
const handleSubmitChange = async () => {
  // event.preventDefault(); // Ngăn chặn việc gửi form một cách mặc định
    const formData = {
      seatStatus: form.values.seatStatus,
      seatNumber: form.values.seatNumber,
      roomId: form.values.roomId,
      seatType: form.values.seatType,
    };
    form.reset();
    updateSeat(form.values.seatId.toString(), formData);
};
const handleSubmit = async () => {
  // event.preventDefault(); // Ngăn chặn việc gửi form một cách mặc định

  try {
    const formData = {
      seatStatus: form.values.seatStatus,
      seatNumber: form.values.seatNumber,
      roomId: form.values.roomId,
      seatType: form.values.seatType,
    };

    // Gọi API POST để tạo mới dữ liệu
    const response = await SeatService.addSeat(formData);

    // Xử lý kết quả trả về từ API, ví dụ hiển thị thông báo thành công
    console.log('Seat created successfully:', response);
    // Thực hiện các hành động tiếp theo sau khi tạo thành công (nếu cần)

    // Đặt lại form sau khi gửi thành công (nếu cần)
    form.reset();
    fetchSeat();
  } catch (error) {
    // Xử lý lỗi khi gọi API, ví dụ hiển thị thông báo lỗi
    console.error('Error creating seat:', error);
    // Thực hiện các hành động xử lý lỗi (nếu cần)
  }
};
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
      const handleDeletSeatClick = (seatId: number) => {
        deleteSeat(seatId.toString());
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


    const rows = seats?.data.map((row) => (
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
            onClick={() => handleDeletSeatClick(row.seatId)}
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
            <form  onSubmit={form.onSubmit(isUpdate ? handleSubmitChange : handleSubmit)}>
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