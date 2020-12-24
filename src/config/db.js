import mongoose from 'mongoose';

const connectMongo = async () => {
  await mongoose.connect('mongodb://mongo:27017/docker-node-mongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

export default connectMongo;
