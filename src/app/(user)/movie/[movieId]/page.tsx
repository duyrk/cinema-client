'use client';

import { Box, Group, Image, SimpleGrid, useMantineColorScheme } from '@mantine/core';
import { useParams } from 'next/navigation';
import FilmInfo from './_component/FilmInfo';
import ShowTime, { IShowTimeData } from './_component/ShowTime';
import ShiftTimeItem from './_component/ShiftTimeItem';
import SeatItem from './_component/SeatItem';
import React from 'react';
import { MovieService } from '@services/MovieService';
import dayjs from 'dayjs';

export default function MoviePage() {
  const { movieId } = useParams();
  const convertDateTime = (dateTime: string) => {
    const dayjsObject = dayjs(dateTime);
    const day = dayjsObject.date();
    const month = dayjsObject.month() + 1;
    const year = dayjsObject.year();
    const dayOfWeek = dayjsObject.format('dddd');
    return { day, month, year, dayOfWeek };
  };
  const [movieData, setMovieData] = React.useState<IMovie>({
    actor: '',
    ageRestriction: '',
    description: '',
    director: '',
    duration: '',

    endDate: '',
    movieGenre: '',
    movieId: -1,
    movieName: '',
    releaseDate: '',
    status: 0,
    urlThumbnail: '',
    urlTrailer: '',
  });
  const showTimeGroupMap = new Map<string, Array<ShowTimes>>();
  const [showTimeByDate, setShowTimeByDate] = React.useState<
    Array<{ label: string; value: string }>
  >([]);
  const [showTimeGroup, setShowTimeGroup] = React.useState<Array<ShowTimes>>([]);
  const [activeShowTime, setActiveShowTime] = React.useState(0);
  const { colorScheme } = useMantineColorScheme();
  const getMovieById = async (movieId: string) => {
    try {
      const res = await MovieService.getMovieById(movieId);
      setMovieData(res.data.data);
      groupShowTime(res.data.data.showTimes);
    } catch (error) {
      console.log('error' + error);
    }
  };

  const groupShowTime = (showTimes: Array<ShowTimes>) => {
    const uniqueDates: any = {};
    console.log(showTimes);
    showTimes.forEach((item, index) => {
      if (showTimeGroupMap.get(convertDateTime(item.timeStart).day.toString()) === undefined) {
        showTimeGroupMap.set(convertDateTime(item.timeStart).day.toString(), [item]);
      } else {
        showTimeGroupMap.set(convertDateTime(item.timeStart).day.toString(), [
          ...showTimeGroupMap.get(convertDateTime(item.timeStart).day.toString())!,
          item,
        ]);
      }
      const date = convertDateTime(item.timeStart).day; // Lấy ngày từ timeStart
      uniqueDates[date] = item.timeStart; // Sử dụng ngày làm key để đảm bảo duy nhất
    });

    const uniqueDatesArray = Object.keys(uniqueDates).map((date) => ({
      label: date,
      value: uniqueDates[date],
    }));

    setShowTimeByDate(uniqueDatesArray);
    setShowTimeGroup(showTimeGroupMap.get(uniqueDatesArray[0].label) ?? []);
  };
  const handleClickShowTimeDate = (label: string) => {
    setShowTimeGroup(showTimeGroupMap.get(label)!);
  };
  React.useEffect(() => {
    getMovieById(movieId as string);
  }, []);
  return (
    <Box>
      <Box className="relative py-20">
        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-20">
          <Image fit="cover" h={'100%'} src={movieData?.urlThumbnail} />
        </div>
        <Box className="relative z-1">
          <FilmInfo
            data={{
              actors: movieData?.actor,
              director: movieData.director,
              movieName: movieData.movieName,
              movieGenres: movieData.movieGenre,
              thumbnail: movieData.urlThumbnail,
              description: movieData.description,
              embedTrailer: movieData.urlTrailer,
              ageRestriction: movieData?.ageRestriction,
            }}
          />
        </Box>
      </Box>
      <Group justify="center" bg={'dark.9'}>
        {/* <ShowTime data={{ dateTime: '2024-04-20T15:00:00.000+00:00' }} isActive={true} />
        <ShowTime data={{ dateTime: '2024-04-20T15:00:00.000+00:00' }} isActive={false} />
        <ShowTime data={{ dateTime: '2024-04-20T15:00:00.000+00:00' }} isActive={false} />
        <ShowTime data={{ dateTime: '2024-04-20T15:00:00.000+00:00' }} isActive={false} />
        <ShowTime data={{ dateTime: '2024-04-20T15:00:00.000+00:00' }} isActive={false} /> */}
        {showTimeByDate.map((item, index) => (
          <ShowTime
            key={`item-showtime-${index}`}
            data={{ dateTime: item.value }}
            isActive={activeShowTime === index}
            onClick={()=>{handleClickShowTimeDate(item.label)}}
          />
        ))}
      </Group>
      <Group justify="center" mt={20}>
        {showTimeGroup.map((item, index) => (
          <ShiftTimeItem data={{ dateTime: item.timeStart, showTimeId: 1 }} />
        ))}
      </Group>
      <Group justify="center" mt={30}>
        <Image
          src={'https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Fscreen.png&w=1080&q=75'}
        />
      </Group>
      <Group justify="center" mt={30} mb={100}>
        <SimpleGrid cols={5}>
          <SeatItem data={{ seatName: 'A1' }} />
          <SeatItem data={{ seatName: 'A1' }} />
          <SeatItem data={{ seatName: 'A1' }} />
          <SeatItem data={{ seatName: 'A1' }} />
          <SeatItem data={{ seatName: 'A1' }} />
          <SeatItem data={{ seatName: 'A1' }} />
          <SeatItem data={{ seatName: 'A1' }} />
          <SeatItem data={{ seatName: 'A1' }} />
          <SeatItem data={{ seatName: 'A1' }} />
          <SeatItem data={{ seatName: 'A1' }} />
        </SimpleGrid>
      </Group>
    </Box>
  );
}
