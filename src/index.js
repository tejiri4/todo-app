import express from 'express';
import connectMongo from './db/connect';
import './config/dotenv';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => res.status(200).json({
  message: 'I am alive',
}));

// connect to mongo db
connectMongo();

app.listen(port, () => { console.log('app is listening on port 3000'); });
