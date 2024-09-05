import crypto from 'crypto';

export const TokenGenerator = () => {
  return crypto.randomBytes(32).toString('hex');
};
