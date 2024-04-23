import { ERole } from '@constants';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const userInitState: IUser = {
  userId: 0,
  username: '',
  fullname: '',
  email: '',
  phone: '',
  address: '',
  role: ERole.USER,
};

const userAtom = atomWithStorage('user', userInitState);
userAtom.debugLabel = 'user atom';
export default userAtom;
