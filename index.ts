import express, {Express, Request, Response} from 'express'
import auth from './routes/authRoute';
import cors from "cors";
const app = express();

app.use(express.json())
app.use(cors())
auth(app);

app.listen(5000, () => {
    console.log('Server start');
})