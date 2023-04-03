import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { IUserWithId } from '../services/interfaces/IUserService';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const configJWT: SignOptions = { algorithm: 'HS256' };

const createJwt = (payload: Omit<IUserWithId, | 'password' | 'email'>) =>
  jwt.sign(payload, JWT_SECRET, configJWT);

const verifyJwt = (token: string) => jwt.verify(token, JWT_SECRET);

const verifyBcrypt = (password: string, hash: string): boolean => {
  const result = bcrypt.compareSync(password, hash);
  return result;
};

const authFunctions = { createJwt, verifyJwt, verifyBcrypt };

export default authFunctions;
