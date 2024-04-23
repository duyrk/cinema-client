'use client';

import { Carousel } from '@mantine/carousel';
import React, { useRef } from 'react';
import { Box, Container, Grid, Group, Image, SimpleGrid, Text } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import FilmItem from './_component/FilmItem';
import userAtom from '@states/atomsStorage/userAtom';
import { useAtom } from 'jotai';
import { MovieService } from '@services/MovieService';
const BANNER_IMAGEs = [
  'https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2FMageINIC%2Fbannerslider%2Fbiet-doi-san-ma.jpg&w=1920&q=75',
  'https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2FMageINIC%2Fbannerslider%2Fthanh-xuan-18x2.jpg&w=750&q=75',
  'https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2FMageINIC%2Fbannerslider%2Fcivil-war.jpg&w=1080&q=75',
  'https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2FMageINIC%2Fbannerslider%2Fyeu-cuong-loan.jpg&w=1080&q=75',
  'https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2FMageINIC%2Fbannerslider%2Ftu-vien-mau_1.jpg&w=1080&q=75',
  'https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2FMageINIC%2Fbannerslider%2Fgodzilla.jpg&w=1080&q=75',
  'https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2FMageINIC%2Fbannerslider%2Fcai-gia-cua-hp.jpg&w=1080&q=75',
];

export default function PageHome() {
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  const [allMovies, setAllMovies] = React.useState<IMovie[]>([]);
  const [comingSoonMovies, setComingSoonMovies] = React.useState<IMovie[]>([]);
  const movieAPI = async () => {
    try {
      const res = await MovieService.getAllMovie();
      console.log(res);
      const allCurrentMovies = res.data.data.filter((item) => item.status === 1);
      const comingSoonMovies = res.data.data.filter((item) => item.status === 0);
      setAllMovies(allCurrentMovies);
      setComingSoonMovies(comingSoonMovies);
    } catch (error) {
      console.log('error' + error);
    }
  };
  React.useEffect(() => {
    movieAPI();
  }, []);
  return (
    <Box>
      <Carousel
        withIndicators
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {BANNER_IMAGEs.map((item, index) => (
          <Carousel.Slide key={`item-${index}`}>
            <Image src={item} width={'100%'} height={'100%'} />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Group justify="center">
        <Text className="text-3xl font-extrabold font-sans" mt={20}>
          PHIM ĐANG CHIẾU
        </Text>
      </Group>
      <Box px={10} mt={20}>
        <SimpleGrid cols={{ base: 2, sm: 2, md: 4, lg: 5 }}>
          {allMovies.map((item, index) => (
            <FilmItem
              key={item.movieId + ''}
              id={item.movieId + ''}
              genres={item.movieGenre}
              description={item.description}
              director={item.director}
              duration={item.duration}
              name={item.movieName}
              thumbnail={item.urlThumbnail}
              rating={item.ageRestriction}
            />
          ))}
        </SimpleGrid>
      </Box>
      <Group justify="center">
        <Text className="text-3xl font-extrabold font-sans" mt={20}>
          PHIM SẮP CHIẾU
        </Text>
      </Group>
      <Box px={10} mt={20} mb={60}>
        <SimpleGrid cols={{ base: 2, sm: 2, md: 4, lg: 5 }}>
        {comingSoonMovies.map((item, index) => (
            <FilmItem
              key={item.movieId + ''}
              id={item.movieId + ''}
              genres={item.movieGenre}
              description={item.description}
              director={item.director}
              duration={item.duration}
              name={item.movieName}
              thumbnail={item.urlThumbnail}
              rating={item.ageRestriction}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
