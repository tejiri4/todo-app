import express from 'express';
import connectMongo from './config/db';

const app = express();

const port = 3000;

app.use(express.json());

app.get('/', (req, res) => res.status(200).json({
  message: 'I am alive',
}));

// connect to mongo db
connectMongo();

app.listen(port, () => { console.log('app is listening on port 3000'); });
