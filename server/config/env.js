import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/onewaydigital',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  ADMIN_API_KEY: process.env.ADMIN_API_KEY || 'oneway_admin_secret_key_2026',
  SMTP: {
    HOST: process.env.SMTP_HOST || '',
    PORT: parseInt(process.env.SMTP_PORT, 10) || 587,
    SECURE: process.env.SMTP_SECURE === 'true',
    USER: process.env.SMTP_USER || '',
    PASS: process.env.SMTP_PASS || '',
    FROM: process.env.MAIL_FROM || '"One Way Digital Media" <no-reply@onewaydigital.in>',
    TEAM_EMAIL: process.env.TEAM_EMAIL || 'contact@onewaydigital.in',
  },
};
