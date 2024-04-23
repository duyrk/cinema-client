'use client';

import { useRouter } from '@libs/patch-router';
import { Box, Button, Container, Group, Paper, Stack, Table, Text } from '@mantine/core';
import { PaymentService } from '@services/PaymentService';
import { useSearchParams } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter()
  const params = useSearchParams();
  const price = params.get('price');
  const seatLocation: Array<string> = JSON.parse(params.get('seatLocation') ?? '');
  const date = params.get('date');
  const showTimeId = params.get('showTimeId');
  const userId = params.get('userId');
  const movieName = params.get('movieName');
  const timeStart = params.get('timeStart');
  const roomId = params.get('roomId');
  const paymentApi = async () => {
    try {
      const res = await PaymentService.addNewTicket({
        date: date!,
        price: price!,
        seatLocation: seatLocation,
        showtimeId: Number(showTimeId),
        userId: Number(userId),
      });
      console.log(res.data.message);
      alert(res.data.message)
      router.push('/home')
    } catch (error) {
      console.log('error' + error);
    }
  };
  return (
    <Container>
      <Group justify="center">
        <Text className="text-3xl font-extrabold font-sans" mt={40}>
          THANH TOÁN
        </Text>
      </Group>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Text className="text-2xl">Thông tin phim</Text>
        <Group mt={20}>
          <Text className="text-xl">Phim:</Text>
          <Text fw={700}>{movieName}</Text>
        </Group>
        <Group>
          <Group mt={20}>
            <Text className="text-xl">Giờ chiếu:</Text>
            <Text fw={700}>{timeStart}</Text>
          </Group>
          <Group mt={20}>
            <Text className="text-xl">Ghế:</Text>
            <Text fw={700}>{seatLocation.toString()}</Text>
          </Group>
        </Group>
        <Group mt={20}>
          <Text className="text-xl">Phòng chiếu:</Text>
          <Text fw={700}>{roomId}</Text>
        </Group>
      </Paper>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Text className="text-2xl">Thông tin thanh toán</Text>
        <Table mt={20}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <Text fw={700}>Danh mục</Text>
              </Table.Th>
              <Table.Th>
                <Text fw={700}>Số lượng</Text>
              </Table.Th>
              <Table.Th>
                <Text fw={700}>Tổng tiền</Text>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Td>
              <Text fw={700}>{`Ghế (${seatLocation.toString()})`}</Text>
            </Table.Td>
            <Table.Td>
              <Text fw={700}>{seatLocation.length}</Text>
            </Table.Td>
            <Table.Td>
              <Text fw={700}>{price}đ</Text>
            </Table.Td>
          </Table.Tbody>
        </Table>
      </Paper>
      <Button
        fullWidth
        variant="gradient"
        gradient={{ from: 'red', to: 'pink', deg: 90 }}
        mt={30}
        mb={30}
        onClick={paymentApi}
      >
        Thanh toán
      </Button>
    </Container>
  );
}
