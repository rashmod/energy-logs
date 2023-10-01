import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
	employeeName: String,
	accessTime: Date,
	filter: String,
});

const LogModel = mongoose.model('Log', LogSchema);

export default LogModel;
