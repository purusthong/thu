import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import Manager from './src/API/manager';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
let managerAPI: Manager;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
managerAPI = new Manager(app);
managerAPI.enable();
app.get('/', (req, res) => {
  res.send('Hello, My name is Bap!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
