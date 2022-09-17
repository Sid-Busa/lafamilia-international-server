import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import Products from '../model/products.js';
import { v2 as cloudinary } from 'cloudinary'
const router = Router();

router.post('/createProduct', auth, async (req, res) => {
	const {
		code,
		sizes,
		finishes,
		width,
		weight,
		load_capacity,
		thickness,
		category_id,
	} = req.body;

	const file = req.files.imageUrl

	try {
		const url = await cloudinary.uploader.upload(file.tempFilePath)		
		const imgId = url.secure_url.split("/").pop().split(".")[0];
		const products = await new Products({
			imgId,
			imageUrl:url.secure_url,
			code,
			sizes,
			finishes,
			width,
			weight,
			load_capacity,
			thickness,
			category_id,
		});
		await products.save();
		res.send({
			success: true,
			products,
			message: 'products is created',
		});
	} catch (error) {
		console.log('Error', error);
		res.status(500).json({ success: false, error, message: error.message });
	}
});

router.get('/getAllProduct', async (req, res) => {
	try {
		const allProducts = await Products.find();
		res.status(200).send({
			success: true,
			products: allProducts,
			message: 'Products Details',
		});
	} catch (error) {
		console.log('Error', error);
		res.status(500).send({ success: false, error, message: error.message });
	}
});

router.get('/getProductById/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const product = await Products.findById({ _id: id });
		res
			.status(200)
			.send({ success: true, product, message: 'product Details' });
	} catch (error) {
		console.log('Error', error);
		res.status(500).send({ success: false, error, message: error.message });
	}
});

router.get('/getProductByCategoryId/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const product = await Products.find({ category_id: id });
		res
			.status(200)
			.send({ success: true, product, message: 'product Details' });
	} catch (error) {
		console.log('Error', error);
		res.status(500).send({ success: false, error, message: error.message });
	}
});

router.put('/updateProduct', auth, async (req, res) => {
	const {
		code,
		sizes,
		finishes,
		width,
		weight,
		load_capacity,
		thickness,
		category_id,
		id,
	} = req.body;

	const file = req.files?.imageUrl
	const fileImageUrl = req.body?.imageUrl
	let url = fileImageUrl
	let newImageId = imgId

	if(file){
		let newUrl = await cloudinary.uploader.upload(file.tempFilePath)	
		url = newUrl.secure_url
		await cloudinary.uploader.destroy(imgId)
		newImageId = newUrl.secure_url.split("/").pop().split(".")[0];
	}

	try {
		const updatedProduct = await Products.findOneAndUpdate(
			{ _id: id },
			{
				code,
				sizes,
				imageUrl:url,
				imgId:newImageId,
				finishes,
				width,
				weight,
				load_capacity,
				thickness,
				category_id,
			},
			{ new: true }
		);

		res.status(200).send({
			success: true,
			updatedProduct,
			message: 'Product update successfully',
		});
	} catch (error) {
		console.log('Error', error);
		res.status(500).send({ success: false, error, message: error.message });
	}
});

router.delete('/deleteProduct/:id/:imgId', auth, async (req, res) => {
	const { id,imgId } = req.params;
	try {
		await cloudinary.uploader.destroy(imgId)

		const product = await Products.deleteOne({ _id: id });
		res
			.status(200)
			.send({ success: true, product, message: 'Delete Product ' });
	} catch (error) {
		console.log('Error', error);
		res.status(500).send({ success: false, error, message: error.message });
	}
});

export default router;
