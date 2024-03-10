import mongoose from 'mongoose';
import Logging from './logging';
import config from 'config';

export async function connect(): Promise<void> {
  const dbUri = config.get<string>('mongo.uri');
  try {
    await mongoose.connect(dbUri);
    Logging.info('Connected to the database');
  } catch (err) {
    if (err instanceof Error) {
      Logging.error(err);
    } else {
      Logging.error('Error connecting to the database');
    }
  }
}
