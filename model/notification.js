import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotificationSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'Name must be required'],
	},
	email: {
		default: '',
		type: String,
		trim: true,
		required: [true, 'Email must be required'],
	},
	subject: {
		default: '',
		type: String,
		trim: true,
		required: [true, 'Subject must be required'],
	},
	message: {
		default: '',
		type: String,
		trim: true,
		required: [true, 'Message must be required'],
	},
});

const notification = mongoose.model('notification', NotificationSchema);

export default notification;
