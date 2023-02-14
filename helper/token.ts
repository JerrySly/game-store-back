import jwt from 'jsonwebtoken';
import { User } from '../database/entities/user';
import { dataSource } from '../database';
import { Token } from '../database/entities/token';

const tokenRepo = dataSource.getRepository(Token);
export const generateToken = async (user: User) => {
  const payload = { id: user.id, email: user.email };
  const accessToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_KEY as string,
    {
      expiresIn: '10m',
    }
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_KEY as string,
    {
      expiresIn: '30d',
    }
  );

  if (!user.id) {
    throw new Error('User not created');
  }
  const userToken = await tokenRepo.findOne({
    where: {
      userId: user.id,
    },
  });

  if (userToken) {
    await tokenRepo.remove(userToken);
  }
  tokenRepo.create({
    token: refreshToken,
    userId: user.id,
  });
  return {
    accessToken,
    refreshToken,
  };
};

export const verifyToken = (refreshToken: string) => {
  return new Promise((resolve, reject) => {
    tokenRepo
      .findOne({
        where: {
          token: refreshToken,
        },
      })
      .then((token) => {
        if (!token) {
          return reject('Invalid token');
        }
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_KEY as string,
          (err, tokenDetails) => {
            if (err) return reject('Invalid token');
            return resolve({
              tokenDetails,
              message: 'Valid token',
            });
          }
        );
      });
  });
};
