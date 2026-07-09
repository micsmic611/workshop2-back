import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '1d';

export interface JwtPayload {
  userId: number;
  roleId: number;
}

export const generateToken = (userId: number, roleId: number): string => {
  return jwt.sign(
    { userId, roleId } as JwtPayload,
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
  );
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export default {
  generateToken,
  verifyToken
};
