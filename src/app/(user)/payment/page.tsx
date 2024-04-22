'use client';

import { Box, Button, Container, Group, Paper, Stack, Table, Text } from '@mantine/core';
import { useSearchParams } from 'next/navigation';

export default function PaymentPage() {
  const params = useSearchParams();

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
          <Text fw={700}>LẬT MẶT 7: MỘT ĐIỀU ƯỚC-K</Text>
        </Group>
        <Group>
          <Group mt={20}>
            <Text className="text-xl">Giờ chiếu:</Text>
            <Text fw={700}>{`${19}:${10}`}</Text>
          </Group>
          <Group mt={20}>
            <Text className="text-xl">Ghế:</Text>
            <Text fw={700}>{`A1, A2`}</Text>
          </Group>
        </Group>
        <Group mt={20}>
          <Text className="text-xl">Phòng chiếu:</Text>
          <Text fw={700}>{`1`}</Text>
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
              <Text fw={700}>Ghế (A1, A2)</Text>
            </Table.Td>
            <Table.Td>
              <Text fw={700}>2</Text>
            </Table.Td>
            <Table.Td>
              <Text fw={700}>80.000đ</Text>
            </Table.Td>
          </Table.Tbody>
        </Table>
      </Paper>
      <Button fullWidth variant="gradient" gradient={{ from: 'red', to: 'pink', deg: 90 }} mt={30} mb={30}>
       Thanh toán
      </Button>
    </Container>
  );
}
