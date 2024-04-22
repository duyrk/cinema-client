

// Auth DTO
interface IUser{
username: string;
fullname: string;
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
//   Auth DTO