import mongoose from 'mongoose';
const { Schema } = mongoose;

const METAL_TYPE = [
	'Aluminium',
	'Brass',
	'Wood',
	'Stainless-Steel',
	'Lather',
	'White-Metal',
	'Glass',
	'Ceramic'
]

const categoriesSchema = new Schema({
	name: {
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
	metalType: {
		type:String,
		enum: METAL_TYPE,
		required: [true,"Invalid metal type"],
	}
});

const categorys = mongoose.model('category', categoriesSchema);

export default categorys;
