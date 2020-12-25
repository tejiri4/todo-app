import express from 'express';
import connectMongo from './db/connect';
import './config/dotenv';
import appRouter from './routes';
import sendMail from './utils/sendEmail';
import { connectRabbitmq } from './services/rabbitmq';
import emailConsumer from './services/emailConsumer';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', appRouter);

// email consumer
emailConsumer();

app.get('/', (req, res) => res.status(200).json({
  message: 'I am alive',
}));

// handle route not found
app.use('/', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// custom error handler
app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
  return next();
});

// connect to mongo db
connectMongo();

app.listen(port, () => { console.log('app is listening on port 3000'); });
