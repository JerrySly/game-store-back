import { Express } from 'express';
import { refreshTokenValidation } from '../utils/validationSchema';
import { verifyToken } from '../helper/token';
import jwt from 'jsonwebtoken';

export default (app: Express) => {
  app.post('/', async (req, res) => {
    const { refreshToken } = req.body;
    const error = refreshTokenValidation({ refreshToken });
    if (error) {
      return res.status(400).json({
        error: true,
        message: 'Invalid refresh token',
      });
    }
    verifyToken(refreshToken)
      .then((data: any) => {
        const payload = {
          id: data.tokenDetails.id,
          email: data.tokenDetails.email,
        };
        const token = jwt.sign(
          payload,
          process.env.ACCESS_TOKEN_KEY as string,
          {
            expiresIn: '14m',
          }
        );
        res.status(200).json({
          token,
        });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
};
