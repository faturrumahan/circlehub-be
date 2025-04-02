import 'dotenv/config';
import { IEnv } from '../interfaces';

const env: IEnv = {
  APP: {
    PORT: process.env.APP_PORT || 3000,
    HOSTNAME: process.env.APP_HOST || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '',
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '',
  },
};

export default env;
