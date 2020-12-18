import { environment } from 'config';

export const onlyInEnv = envName => fn => (envName === environment ? fn() : undefined);

export const onlyInDev = onlyInEnv('development');
export const onlyInProd = onlyInEnv('production');

export const envIsDev = environment === 'development';
export const envIsProd = environment === 'production';
