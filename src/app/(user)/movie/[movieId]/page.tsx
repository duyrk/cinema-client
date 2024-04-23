'use client';

import { Box, Button, Group, Image, SimpleGrid, Stack, useMantineColorScheme } from '@mantine/core';
import { useParams } from 'next/navigation';
import FilmInfo from './_component/FilmInfo';
import ShowTime, { IShowTimeData } from './_component/ShowTime';
import ShiftTimeItem from './_component/ShiftTimeItem';
import SeatItem from './_component/SeatItem';
import React from 'react';
import { MovieService } from '@services/MovieService';
import dayjs from 'dayjs';
import { SeatService } from '@services/SeatService';
import Link from 'next/link';
import { useAtom } from 'jotai';
import userAtom from '@states/atomsStorage/userAtom';
import { useRouter } from '@libs/patch-router';
import { format } from 'date-fns';

interface StatusSeat extends ISeat {
  disabled: boolean;
}
const showTimeGroupMap = new Map<string, Array<IShowtime>>();
export default function MoviePage() {
  const router = useRouter();
  const { movieId } = useParams();
  const [user] = useAtom(userAtom);
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

  const [showTimeByDate, setShowTimeByDate] = React.useState<
    Array<{ label: string; value: string }>
  >([]);
  const [showTimeGroup, setShowTimeGroup] = React.useState<Array<IShowtime>>([]);
  const [activeShowTime, setActiveShowTime] = React.useState(0);
  const [seatOrder, setSeatOrder] = React.useState<Array<string>>([]);
  const [timeStartText, setTimeStartText] = React.useState('')
  const [currentShowTime, setCurrentShowTime] = React.useState<IShowtime>();
  const { colorScheme } = useMantineColorScheme();
  const [seatList, setSeatList] = React.useState<StatusSeat[]>([]);
  const getMovieById = async (movieId: string) => {
    try {
      const res = await MovieService.getMovieById(movieId);
      setMovieData(res.data.data);
      showTimeGroupMap.clear()
      groupShowTime(res.data.data.showTimes);
    } catch (error) {
      console.log('error' + error);
    }
  };

  const groupShowTime = (showTimes: Array<IShowtime>) => {
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
    console.log(showTimeGroupMap);
  };
  const handleClickShowTimeDate = (label: string) => {
    console.log(showTimeGroupMap.get(label));
    setShowTimeGroup(showTimeGroupMap.get(label) ?? []);
  };
  const getSeatByShowTimeId = async (showTimeId: string) => {
    let seatList: Array<ISeat> = [];
    let untakenSeatList: Array<ISeat> = [];
    try {
      const res = await SeatService.getSeatByShowTimeId(showTimeId);
      seatList = res.data.data;
      console.log(seatList);
    } catch (error) {
      console.log('Get seat error' + error);
    }
    try {
      const res = await SeatService.getUntakenSeatByShowTimeId(showTimeId);
      untakenSeatList = res.data.data;
      console.log(untakenSeatList);
    } catch (error) {
      console.log('Get untaken seat error' + error);
    }
    const allSeat = seatList.map((item, index) => {
      let seatFlag = 0;
      let seat: StatusSeat = {
        disabled: false,
        roomId: 0,
        seatId: 0,
        seatNumber: '',
        seatStatus: 0,
        seatType: '',
      };
      untakenSeatList.forEach((_item) => {
        if (item.seatId === _item.seatId) {
          seat = {
            ...item,
            disabled: false,
          };
          seatFlag = 1;
        }
      });
      if (seatFlag === 1) {
        return seat;
      } else {
        return { ...item, disabled: true };
      }
    });
    setSeatList(allSeat);
    console.log(allSeat);
  };

  React.useEffect(() => {
    getMovieById(movieId as string);
  }, []);
  console.log(user)
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
        {showTimeByDate.map((item, index) => (
          <ShowTime
            key={`item-showtime-${index}`}
            data={{ dateTime: item.value }}
            isActive={activeShowTime === index}
            onClick={() => {
              setActiveShowTime(index);
              handleClickShowTimeDate(item.label);
            }}
          />
        ))}
      </Group>
      <Group justify="center" mt={20}>
        {showTimeGroup.map((item, index) => (
          <ShiftTimeItem
            key={`item-shilftime-${index}`}
            data={{ dateTime: item.timeStart, showTimeId: 1 }}
            onClick={(_timeStartText: string) => {
              setTimeStartText(_timeStartText)
              setCurrentShowTime(item);
              getSeatByShowTimeId(item.showTimeId.toString());
            }}
          />
        ))}
      </Group>
      <Group justify="center" mt={30}>
        <Image
          src={'https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Fscreen.png&w=1080&q=75'}
        />
      </Group>
      <Stack align="center" mt={30} mb={100}>
        <SimpleGrid cols={5}>
          {seatList.map((item, index) => (
            <SeatItem
              data={{ seatName: item.seatNumber, price: 80000 }}
              disabled={item.disabled}
              isActive={seatOrder.includes(item.seatNumber) ? true : false}
              onClick={() => {
                if (seatOrder.includes(item.seatNumber)) {
                  const filteredSeat = seatOrder.filter((seat) => seat !== item.seatNumber);
                  setSeatOrder(filteredSeat);
                } else {
                  setSeatOrder((previous) => [...previous, item.seatNumber]);
                }
              }}
            />
          ))}
        </SimpleGrid>
        {seatOrder.length > 0 ? (
          <Button
            onClick={() => {
              if (user.userName.length === 0) {
                router.push('/login');
              }
            }}
            fullWidth
            w={500}
            mt={50}
            variant="gradient"
            gradient={{ from: 'red', to: 'yellow', deg: 90 }}
          >
            {user.userName.length > 0 ? (
              <Link
                href={{
                  pathname: '/payment',
                  query: {
                    //for payment api
                    price: seatOrder.length * 80000,
                    seatLocation: JSON.stringify(seatOrder),
                    date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                    showTimeId: currentShowTime?.showTimeId,
                    userId: user.userId,
                    // for layout
                    movieName: movieData.movieName,
                    timeStartText: timeStartText,
                    roomId: currentShowTime?.roomId,
                  },
                }}
              >
                Thanh toán
              </Link>
            ) : (
              <>Thanh toán</>
            )}
          </Button>
        ) : (
          <></>
        )}
      </Stack>
    </Box>
  );
}
