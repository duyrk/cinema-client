export * from '@utils/getBaseUrl';
export { default as DateUtils } from '@utils/dateUtils';
import { getBaseUrl, getBaseUrlApi } from '@utils/getBaseUrl';
export { default as WretchInstance } from '@utils/WretchInstance';

const isBrowser = () => typeof window !== 'undefined';
