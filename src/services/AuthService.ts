
import ApiUtil from '@utils/AxiosInstance';

export const AuthServiceEndpoint = {
  login: 'auth/login',
  register: 'auth/register',
};

export const AuthService = {
  login: async (body: ILoginRequest)=>{
      return ApiUtil.post<ILoginResponse>(AuthServiceEndpoint.login, body)
  }
} as const