import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
	imgId:{
		type: String,
		trim: true,
		default: '',
	},
	code: {
		type: String,
		trim: true,
		required: [true, 'Name must be required'],
	},
	imageUrl: {
		default: '',
		type: String,
		trim: true,
		required: [true, 'imageUrl must be required'],
	},
	sizes: {
		default: '',
		type: String,
		trim: true,
		required: [true, 'Sizes must be required'],
	},
	finishes: {
		default: '',
		type: String,
		trim: true,
		required: [true, 'Finishes must be required'],
	},
	width: {
		default: '',
		type: String,
		trim: true,
	},
	weight: {
		default: '',
		type: String,
		trim: true,
	},
	load_capacity: {
		default: '',
		type: String,
		trim: true,
	},
	thickness: {
		default: '',
		type: String,
		trim: true,
	},
	category_id: {
		type: String,
		trim: true,
		required: [true, 'category id must be required'],
	},
});

const product = mongoose.model('product', productSchema);

export default product;
