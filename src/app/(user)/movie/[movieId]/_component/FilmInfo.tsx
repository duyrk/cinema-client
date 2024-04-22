import { Box, Button, Group, Image, Modal, SimpleGrid, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';

const FilmInfo: React.FC = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Box>

      <Group justify="center">
        <Image
          src={
            'https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2F0017511_0.jpg&w=256&q=75'
          }
        />
        <Stack>
          <Text className="text-2xl" fw={700} >
            Vây hãm: Kẻ Trừng Phạt
          </Text>
          <Group>
            <Text >Thể loại:</Text>
            <Text >Hành động</Text>
          </Group>
          <Group>
            <Text >Diễn viên:</Text>
            <Text >Cao Văn Dương, Nguyễn Tùng Dương</Text>
          </Group>
          <Group>
            <Text >Đạo diễn:</Text>
            <Text >Trần Thanh Long</Text>
          </Group>
          <Text w={500} >
            Siêu cớm Ma Seok-dNắm đấm trứ danh liệu có phát huy được sức mạnh trước liên minh tội
            phạm của thiên tài công nghệ và ông trùm nhà cái lớn nhất châu Á?
          </Text>
          <Group>
            <Text c={'red.6'}>Khuyến cáo:</Text>
            <Text c={'yellow.6'}>R18</Text>
          </Group>
          <Button color="yellow.6" variant="outline" onClick={open}>
            Xem trailer
          </Button>
        </Stack>
      </Group>
      <Modal size={'auto'} opened={opened} onClose={close} title="Trailer">
        {/* Modal content */}
        <iframe
          width="853"
          height="480"
          src="https://www.youtube.com/embed/8KtYRALe-xo?si=P_Ga6PGE9TmdE2kA"
          title="7UPPERCUTS - DOPAMINE"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </Modal>
    </Box>
  );
};
export default FilmInfo;
