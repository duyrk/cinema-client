
import { CookieService } from '@services';

export default class AuthUtils {
  static authKeys = [
    'refreshToken',
    'accessToken',
  ];

  static setTokenData(tokenData: IToken) {
    this.authKeys.forEach((key) => {
      CookieService.set(key, tokenData[key as keyof IToken].toString());
    });
  }

  static removeTokenData() {
    this.authKeys.forEach((key) => {
      CookieService.remove(key);
    });
  }
}