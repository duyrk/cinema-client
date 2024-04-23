import ApiUtil from '@utils/AxiosInstance';

export const AuthServiceEndpoint = {
  login: 'auth/login',
  register: 'auth/register',
  logout:'auth/logout'
};

export const AuthService = {
  login: async (body: ILoginRequest)=>{
      return ApiUtil.post<ILoginResponse>(AuthServiceEndpoint.login, body)
  },
  register: async (body: IRegisterRequest)=>{
    return ApiUtil.post<IRegisterResponse>(AuthServiceEndpoint.register, body)
  },
  logout: async (body: ILogoutRequest)=>{
    return ApiUtil.post<ILogoutResponse>(AuthServiceEndpoint.logout, body)
  }
} as const