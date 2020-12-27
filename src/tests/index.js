import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';

// mock mongodb
export const connectMongo = async () => {
	let mockgoose = new Mockgoose(mongoose);

	await mockgoose.prepareStorage();

	mongoose.connect('mongodb://example.com/TestingDB', { useNewUrlParser: true, useUnifiedTopology: true });

	mongoose.connection.on('connected', () => {
		console.log('db connection is now open');
	});
}

// mock express response
export const mockExpressResponse = {
	status: code => ({
		json: data => data
	})
}