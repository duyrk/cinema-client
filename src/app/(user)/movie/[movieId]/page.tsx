'use client';

import { Box, Group, Image, SimpleGrid, useMantineColorScheme } from '@mantine/core';
import { useParams } from 'next/navigation';
import FilmInfo from './_component/FilmInfo';
import ShowTime from './_component/ShowTime';
import ShiftTimeItem from './_component/ShiftTimeItem';
import SeatItem from './_component/SeatItem';

export default function MoviePage() {
  const { movieId } = useParams();
  const {colorScheme}= useMantineColorScheme()
  return (
    <Box>
        <Box className='relative py-20'>      
      <div className="absolute top-0 left-0 right-0 bottom-0 opacity-30">
        <Image
          fit="cover"
          h={'100%'}
          src={
            'https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2F0017511_0.jpg&w=256&q=75'
          }
        />
      </div>
      <Box className="relative z-1" >
        <FilmInfo />
      </Box>
      </Box>
     <Group justify='center' bg={'dark.9'} >
            <ShowTime data={{dateTime: "2024-04-20T15:00:00.000+00:00"}} isActive={true}/>
            <ShowTime data={{dateTime: "2024-04-20T15:00:00.000+00:00"}} isActive={false}/>
            <ShowTime data={{dateTime: "2024-04-20T15:00:00.000+00:00"}} isActive={false}/>
            <ShowTime data={{dateTime: "2024-04-20T15:00:00.000+00:00"}} isActive={false}/>
            <ShowTime data={{dateTime: "2024-04-20T15:00:00.000+00:00"}} isActive={false}/>
     </Group>
     <Group justify='center' mt={20}>
     <ShiftTimeItem data={{dateTime: '2024-04-20T15:00:00.000+00:00', showTimeId: 1}}/>
     </Group>
     <Group justify='center' mt={30}>

     <Image src={'https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Fscreen.png&w=1080&q=75'}/>
     </Group>
     <Group justify='center' mt={30} mb={100}>
            <SimpleGrid cols={5}>
                <SeatItem data={{seatName:'A1'}}/>
                <SeatItem data={{seatName:'A1'}}/>
                <SeatItem data={{seatName:'A1'}}/>
                <SeatItem data={{seatName:'A1'}}/>
                <SeatItem data={{seatName:'A1'}}/>
                <SeatItem data={{seatName:'A1'}}/>
                <SeatItem data={{seatName:'A1'}}/>
                <SeatItem data={{seatName:'A1'}}/>
                <SeatItem data={{seatName:'A1'}}/>
                <SeatItem data={{seatName:'A1'}}/>
            </SimpleGrid>
     </Group>
    </Box>
  );
}
