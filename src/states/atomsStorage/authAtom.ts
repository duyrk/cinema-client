import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const authInitState: {isLogin: boolean} = {
    isLogin: false
}

const authAtom = atomWithStorage('islogin',authInitState);
authAtom.debugLabel = 'auth atom';
export default authAtom;
