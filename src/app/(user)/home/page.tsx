'use client';

import { Carousel } from '@mantine/carousel';
import {useRef} from 'react';
import { Box, Container, Grid, Group, Image, SimpleGrid, Text } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import FilmItem from './_component/FilmItem';
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
  const autoplay = useRef(Autoplay({delay: 4000}));
  return (
    <Box>
      <Carousel
        withIndicators
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {BANNER_IMAGEs.map( (item,index) => (
          <Carousel.Slide key={`item-${index}`}>
            <Image src={item} width={'100%'} height={'100%'} />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Group justify='center'>
        <Text className="text-3xl font-extrabold font-sans" mt={20}>PHIM ĐANG CHIẾU</Text>
      </Group>
      <Box px={10} mt={20}>
      <SimpleGrid cols={5}>
      <FilmItem name='hêyy' thumbnail='https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F04-2024%2Fcai-gia-cua-hanh-phuc-poster.jpg&w=1920&q=75'/>
      <FilmItem thumbnail='https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F04-2024%2Fcai-gia-cua-hanh-phuc-poster.jpg&w=1920&q=75'/>
      <FilmItem thumbnail='https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F04-2024%2Fcai-gia-cua-hanh-phuc-poster.jpg&w=1920&q=75'/>
      <FilmItem thumbnail='https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F04-2024%2Fcai-gia-cua-hanh-phuc-poster.jpg&w=1920&q=75'/>
      <FilmItem thumbnail='https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F04-2024%2Fcai-gia-cua-hanh-phuc-poster.jpg&w=1920&q=75'/>
      </SimpleGrid>
      </Box>
      <Group justify='center'>
        <Text className="text-3xl font-extrabold font-sans" mt={20}>PHIM SẮP CHIẾU</Text>
      </Group>
      <Box px={10} mt={20}>
      <SimpleGrid cols={5}>
      <FilmItem thumbnail='https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F04-2024%2Fcai-gia-cua-hanh-phuc-poster.jpg&w=1920&q=75'/>
      <FilmItem thumbnail='https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F04-2024%2Fcai-gia-cua-hanh-phuc-poster.jpg&w=1920&q=75'/>
      <FilmItem thumbnail='https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F04-2024%2Fcai-gia-cua-hanh-phuc-poster.jpg&w=1920&q=75'/>
      <FilmItem thumbnail='https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F04-2024%2Fcai-gia-cua-hanh-phuc-poster.jpg&w=1920&q=75'/>
      <FilmItem thumbnail='https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F04-2024%2Fcai-gia-cua-hanh-phuc-poster.jpg&w=1920&q=75'/>
      </SimpleGrid>
      </Box>
    </Box>
  );
}
