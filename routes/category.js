import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import Categorys from '../model/category.js';
import Products from '../model/products.js';
const router = Router();

router.post('/createCategory', auth, async (req, res) => {
	const { name, imageUrl,metalType } = req.body;

	try {
		const category = await new Categorys({
			name,
			imageUrl,
			metalType
		});
		await category.save();
		res.send({
			success: true,
			category,
			message: 'Category is created',
		});
	} catch (error) {
		console.log('Error', error);
		res.status(500).json({ success: false, error, message: error.message });
	}
});

router.get('/getAllCategory', async (req, res) => {
	try {
		const allCategory = await Categorys.find();
		res.status(200).send({
			success: true,
			category: allCategory,
			message: 'Category Details',
		});
	} catch (error) {
		console.log('Error', error);
		res.status(500).send({ success: false, error, message: error.message });
	}
});

router.get('/getCategoryById/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const category = await Categorys.findById({ _id: id });
		res
			.status(200)
			.send({ success: true, category, message: 'Category Details' });
	} catch (error) {
		console.log('Error', error);
		res.status(500).send({ success: false, error, message: error.message });
	}
});

router.get('/getCategoryByMetalName/:name', async (req, res) => {
	const { name } = req.params;
	try {
		const category = await Categorys.find({ metalType: name });
		res
			.status(200)
			.send({ success: true, category, message: 'Category Details' });
	} catch (error) {
		console.log('Error', error);
		res.status(500).send({ success: false, error, message: error.message });
	}
});

router.put('/updateCategory', auth, async (req, res) => {
	const { name, imageUrl, id,metalType } = req.body;

	try {
		const updatedCategory = await Categorys.findOneAndUpdate(
			{ _id: id },
			{ name, imageUrl,metalType },
			{ new: true }
		);

		res.status(200).send({
			success: true,
			updatedCategory,
			message: 'Category update successfully',
		});
	} catch (error) {
		console.log('Error', error);
		res.status(500).send({ success: false, error, message: error.message });
	}
});

router.delete('/deleteCategoryById/:id', auth, async (req, res) => {
	const { id } = req.params;
	try {
		const category = await Categorys.deleteOne({ _id: id });
		await Products.deleteMany({ category_id: id });
		
		res
			.status(200)
			.send({ success: true, category, message: 'Delete Category ' });
	} catch (error) {
		console.log('Error', error);
		res.status(500).send({ success: false, error, message: error.message });
	}
});

export default router;
