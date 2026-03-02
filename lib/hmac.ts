import crypto from 'crypto';

const HMAC_SECRET = process.env.HMAC_SECRET || 'dev-hmac-secret-change-in-production';

export function generateHmac(payload: string): string {
  return crypto.createHmac('sha256', HMAC_SECRET).update(payload).digest('hex');
}
