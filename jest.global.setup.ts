import dotenv from 'dotenv';

export default function globalSetup() {
  dotenv.config({ path: __dirname + '/.env' });
}
