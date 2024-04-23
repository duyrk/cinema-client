// import { DefaultResponse } from '@services';
// import { IToken, IUser } from '@global/global';

// Auth DTO

interface IUser{
  refreshToken: string;	username: string;
  message: string;	fullname: string;
  email: string;
  phone:string;
  address: string;
  role: import('../constants/enums').ERole
  }


  interface ILoginRequest {
    username: string;
    password: string;
  }

interface ILoginResponse{
  accessToken: string;
  refreshToken: string;
  data: IUser
}

//Movie DTO
interface IMovie{
  movieId: number;
  movieName: string;
  movieGenre: string;
  description: string;
  duration: string;
  director: string;
  actor: string;
  releaseDate: string;
  endDate: string;
  ageRestriction: string
  urlTrailer: string;
  status: number;
  urlThumbnail: string;
}
interface IMovieResponse{
  data :IMovie[]
}

interface IMovieRequest{
  movieName: string;
  movieGenre: string;
  description: string;
  duration: string;
  director: string;
  actor: string;
  releaseDate: string;
  endDate: string;
  ageRestriction: string
  urlTrailer: string;
  status: number;
  urlThumbnail: string;
}

//Showtime DTO
interface IShowtimeRequest{
  timeStart: string;
  timeEnd: string;
  status: number;
  movieId: number;
  roomId: number;
}

interface IShowtimeResponse{
  data: IShowtime[]
}

interface IShowtime{
  showTimeId: number;
  timeStart: string;
  timeEnd: string;
  status: number;
  movieId: number;
  roomId: number;
}

//Room DTO
interface IRoomRequest{
  status: number;
  roomType: string;
}

interface IRoomResponse{
  data: IRoom[]
}

interface IRoom{
  roomId: number;
  status: number;
  seatQuantity: number;
  roomType: string;
}

//Seat DTO
interface ISeat{
  seatId: number;
  seatNumber: string;
  seatStatus: number;
  seatType: string;
  roomId: number;
}

interface ISeatResponse{
  data: ISeat[]
}
interface ISeatRequest{
  seatNumber: string;
  seatStatus: number;
  seatType: string;
  roomId: number;
}