import mongoose from 'mongoose';
import '../config/dotenv';

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log('database was connected successfully');
  } catch (err) {
    console.log('database connection failed');
  }
};

export default connectMongo;
