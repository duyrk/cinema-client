// Auth DTO
interface IUser {
  userId: number;
  userName: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  role: import('../constants/enums').ERole;
}

interface IRegisterRequest {
  userName: string;
  passWord: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
}
interface IRegisterResponse {
  data: any;
  message: string;
}

interface ILogoutRequest {
  refreshToken: string;
}
interface ILogoutResponse {
  data: any;
  message: string;
}
//   Auth DTO
// import { DefaultResponse } from '@services';
// import { IToken, IUser } from '@global/global';

// Auth DTO

interface ILoginRequest {
  username: string;
  password: string;
}

interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  data: IUser;
}

//Movie DTO
interface IMovie {
  movieId: number;
  movieName: string;
  movieGenre: string;
  description: string;
  duration: string;
  director: string;
  actor: string;
  releaseDate: string;
  endDate: string;
  ageRestriction: string;
  urlTrailer: string;
  status: number;
  urlThumbnail: string;
}
interface IMovieResponse {
  data: IMovie[];
}

interface IMovieRequest {
  movieName: string;
  movieGenre: string;
  description: string;
  duration: string;
  director: string;
  actor: string;
  releaseDate: string;
  endDate: string;
  ageRestriction: string;
  urlTrailer: string;
  status: number;
  urlThumbnail: string;
}

//Showtime DTO
interface IShowtimeRequest {
  timeStart: string;
  timeEnd: string;
  status: number;
  movieId: number;
  roomId: number;
}

interface IShowtimeResponse {
  data: IShowtime[];
}

interface IShowtime {
  showTimeId: number;
  timeStart: string;
  timeEnd: string;
  status: number;
  movieId: number;
  roomId: number;
}
interface IGetMovieByIdResponse {
  data: {
    showTimes: IShowtime[];
  } & IMovie;

  message: string;
}

//Room DTO
interface IRoomRequest {
  status: number;
  roomType: string;
}

interface IRoomResponse {
  data: IRoom[];
}

interface IRoom {
  roomId: number;
  status: number;
  seatQuantity: number;
  roomType: string;
}

//Seat DTO
interface ISeat {
  seatId: number;
  seatNumber: string;
  seatStatus: number;
  seatType: string;
  roomId: number;
}

interface ISeatResponse {
  data: ISeat[];
}
interface ISeatRequest {
  seatNumber: string;
  seatStatus: number;
  seatType: string;
  roomId: number;
}
interface ISeatByShowTimeIdRequest {
  showTimeId: string;
}
interface ISeatByShowTimeResponse {
  data: ISeat[];
  message: string;
}

interface IAddNewTicketRequest{
  price: string;
  seatLocation: Array<string>;
  date: string;
  showtimeId: number;
  userId: number
}
interface IAddNewTicketResponse{
  data: any;
  message: string
}