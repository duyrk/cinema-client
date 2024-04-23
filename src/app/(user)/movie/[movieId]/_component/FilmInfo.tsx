import { Box, Button, Group, Image, Modal, SimpleGrid, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
export interface IFIlmInfo {
  thumbnail: string;
  movieName: string;
  movieGenres: string;
  actors: string;
  director: string;
  description: string;
  ageRestriction: string;
  embedTrailer: string;
}
export interface FIlmInfoProps {
  data: IFIlmInfo;
}
const FilmInfo: React.FC<FIlmInfoProps> = (props) => {
  const { data } = props;
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Box>
      <Group justify="center">
        <Image src={data.thumbnail} h={350} fit='fill'/>
        <Stack>
          <Text className="text-2xl" fw={700}>
            {data.movieName}
          </Text>
          <Group>
            <Text>Thể loại:</Text>
            <Text>{data.movieGenres}</Text>
          </Group>
          <Group>
            <Text>Diễn viên:</Text>
            <Text>{data.actors}</Text>
          </Group>
          <Group>
            <Text>Đạo diễn:</Text>
            <Text>{data.director}</Text>
          </Group>
          <Text w={500}>{data.description}</Text>
          <Group>
            <Text c={'red.6'}>Khuyến cáo:</Text>
            <Text c={'yellow.6'}>{data.ageRestriction}</Text>
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
          src={data.embedTrailer}
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
