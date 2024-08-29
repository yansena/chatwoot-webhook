import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  chatwootApiUrl: process.env.CHATWOOT_API_URL || '',
  chatwootAccountId: process.env.CHATWOOT_ACCOUNT_ID || '',
  chatwootApiToken: process.env.CHATWOOT_API_TOKEN || '',
  port: process.env.PORT || 3000
};
