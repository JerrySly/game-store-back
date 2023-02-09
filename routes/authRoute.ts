import { Express } from 'express';
import { singUp, logIn } from '../services/auth';
import { User } from '../types/user';
import { logInValidation, singUpValidation } from '../utils/validationSchema';
import { generateToken } from '../helper/token';
export default (app: Express) => {
  app.post('/singUp', async (req, res) => {
    try {
      const user: User = req.body;
      console.log('req', user);
      const { error } = singUpValidation(user);
      console.log(error);
      if (error) {
        return res.status(400).json({
          error: true,
          message: 'Invalid user data',
        });
      }
      const response = await singUp(user);
      if (response.error) {
        return res.status(401).json(response);
      }
      res.status(200).json({
        error: false,
        data: null,
        message: 'Ok',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: true,
        message: 'Internal Server Error',
      });
    }
  });

  app.post('/login', async (req, res) => {
    try {
      const user: User = req.body;
      const { error } = logInValidation(user);
      if (error) {
        return res.status(400).json({
          error: true,
          message: 'Invalid user data',
        });
      }
      const response = await logIn(user);
      if (response.error) {
        return res.status(401).json(response);
      }
      const tokens = generateToken(response.data as User);
      res.status(200).json({
        error: false,
        data: tokens,
        message: 'Ok',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: true,
        message: 'Internal Server Error',
      });
    }
  });
};
