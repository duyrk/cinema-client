import { TokenService } from './TokenService';
import { CookieService } from './CookieService';
import { PokemonService } from '@services/PokemonService';
import { StorageService } from './StorageService';
import { AuthService } from './AuthService';
export { TokenService, CookieService, PokemonService, StorageService, AuthService };

export interface DefaultResponse {
  message: string;
  code: number;
}
