import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    classification: String
});

export default mongoose.model('movies', schema);