import mongoose from 'mongoose';
import config from './index';

export default (callback) => {
  mongoose.Promise = global.Promise;
  const db = mongoose.connect(config.mongoUrl, {
    useMongoClient: true
  });
  callback(db);
}
