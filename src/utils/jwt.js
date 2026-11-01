import jwt from 'jsonwebtoken';
import logger from '#config/logger.js';
import { error } from 'winston';

const jwtSecret = process.env.JWT_SECRET || 'secret-key-123';
const jwtExpiresIn = '1d';

export const jwttoken = {
  sign: payload => {
    try {
      return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
    } catch (e) {
      logger.error('Failed to authenticate token', error);
      throw new Error('Failed to authenticate token');
    }
  },
  verify: token => {
    try {
      return jwt.verify(token, jwtSecret);
    } catch (e) {
      logger.error('Failed to authenticate token', e);
      throw new Error('Failed to authenticate token');
    }
  },
};
