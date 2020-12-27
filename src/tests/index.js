import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// mock mongodb
export const connectMongo = async () => {
	const opts = { };

	const mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, opts, (err) => {
    if (err) console.error(err);
  });
}

// mock express response
export const mockExpressResponse = {
	status: code => ({
		json: data => data
	})
}