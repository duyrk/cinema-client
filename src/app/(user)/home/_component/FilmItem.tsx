import { Box, Group, Image, Rating, Stack, Text, useMantineTheme } from '@mantine/core';
import React from 'react';
import classes from '../_styles/FilmItem.module.css';
import Link from 'next/link';
import { ClockIcon, PersonIcon, StarFilledIcon, StarIcon } from '@modulz/radix-icons';
import { IconMovie, IconClock, IconUser } from '@tabler/icons-react';
export interface FilmItem {
  id: string;
  name: string;
  description: string;
  duration: string;
  director: string;
  genres: string;
  rating: string;
  thumbnail: string;
}
const FilmItem: React.FC<FilmItem> = (props) => {
  const theme = useMantineTheme();
  const { id, name, description, duration, director, genres, rating, thumbnail } = props;
  return (
    <Link href={`/movie/${id}`}>
      <Box className={classes.itemContainer}>
        <Box className={`relative ${classes.thumnailContainer}`}>
          <Image className={classes.thumbnail} width={'100%'} h={450} fit='fill'  src={thumbnail} />
          {/* <Group className="absolute top-0 bottom-0 right-0 left-0 justify-end items-start p-3">
           
          </Group> */}
          <Stack
            className={`absolute justify-center top-0 bottom-0 right-0 left-0 ${classes.contentContainer}`}
          >
            <Stack className={classes.content}>
              <Group justify="center">
                <IconClock color={theme.colors.yellow[6]} />
                <Text c="yellow.6" fw={600}>
                  {duration}
                </Text>
              </Group>
              <Group justify="center">
                <IconMovie color={theme.colors.yellow[6]} />
                <Text c="yellow.6" fw={600}>
                  {genres}
                </Text>
              </Group>
              <Group justify="center">
                <IconUser color={theme.colors.yellow[6]} />
                <Text c="yellow.6" fw={600}>
                  {director}
                </Text>
              </Group>
            </Stack>
          </Stack>
        </Box>

        <Text className={`font-sans text-l font-extrabold ${classes.title} text-center mt-3`}>
          {name}
        </Text>
      </Box>
    </Link>
  );
};
export default FilmItem;
