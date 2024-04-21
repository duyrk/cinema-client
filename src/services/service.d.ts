import { DefaultResponse } from '@services';
import { IToken, IUser } from '@global/global';

// Auth DTO

interface ILoginResponse {
accessToken: string;
refreshToken: string;
message: string;
}

interface ILoginRequest {
  username: string;
  password: string;
}
//   Auth DTO