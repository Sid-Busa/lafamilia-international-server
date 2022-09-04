import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import Products from '../model/products.js';
const router = Router();

router.post('/createProduct', auth, async (req, res) => {
	const {
		code,
		sizes,
		imageUrl,
		finishes,
		width,
		weight,
		load_capacity,
		thickness,
		category_id,
	} = req.body;

	try {
		const products = await new Products({
			code,
			imageUrl,
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
		imageUrl,
		width,
		weight,
		load_capacity,
		thickness,
		category_id,
		id,
	} = req.body;

	try {
		const updatedProduct = await Products.findOneAndUpdate(
			{ _id: id },
			{
				code,
				sizes,
				imageUrl,
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

router.delete('/deleteProduct/:id', auth, async (req, res) => {
	const { id } = req.params;
	try {
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
