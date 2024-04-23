
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

interface IRegisterRequest{
  userName: string;
  passWord: string;
  fullName:string;
  email: string;
  phone: string;
  address: string;
}
interface IRegisterResponse{
data: any
message: string
}

interface ILogoutRequest{
  refreshToken: string;
}
interface ILogoutResponse{
  data: any;
  message: string;
}
//   Auth DTO