import { Token } from 'typescript';
import { addValuesToTable, deleteValue, getTable } from '../database';
import { User } from '../types/user';
import jwt from 'jsonwebtoken';
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

  const tokensTable = await getTable<UserToken>('Tokens');
  if (!user.id) {
    throw new Error('User not created');
  }
  const userToken = tokensTable.rows.find((x) => x.userId === user.id);
  if (userToken) {
    await deleteValue('Tokens', user.id, 'userId');
  }

  await addValuesToTable<UserToken>('Tokens', [
    {
      token: refreshToken,
      userId: user.id,
    },
  ]);

  return {
    accessToken,
    refreshToken,
  };
};

export const verifyToken = (refreshToken: string) => {
  return new Promise(( resolve, reject ) => {
    getTable<UserToken>('Tokens').then((data) => {
      const tokenTable = data;
      const token = tokenTable.rows.find((x) => x.token === refreshToken);
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
