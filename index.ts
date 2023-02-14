import express, { Express, Request, Response } from 'express';
import "reflect-metadata";
import auth from './routes/authRoute';
import cors from 'cors';
import { createDefaultTables } from './database';

createDefaultTables();

const app = express();

app.use(express.json());
app.use(cors());
auth(app);

app.listen(5000, () => {
  console.log('Server start');
});
