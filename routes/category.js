import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import Categorys from '../model/category.js';
import Products from '../model/products.js';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary'
const router = Router();



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

router.post('/createCategory', auth, async (req, res) => {

	const { name,metalType } = req.body;
	const file = req.files.imageUrl

	try {
		const url = await cloudinary.uploader.upload(file.tempFilePath)		
		const imgId = url.secure_url.split("/").pop().split(".")[0];
		const category = await new Categorys({
			imgId,
			name,
			imageUrl:url.secure_url,
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

router.put('/updateCategory', auth, async (req, res) => {
	const { name, id,metalType,imgId } = req.body;
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
		const updatedCategory = await Categorys.findOneAndUpdate(
			{ _id: id },
			{ name,metalType,imageUrl:url,imgId:newImageId },
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

router.delete('/deleteCategoryById/:id/:imgId', auth, async (req, res) => {
	const { id,imgId } = req.params;

	try {
		await cloudinary.uploader.destroy(imgId)
		const category = await Categorys.deleteOne({ _id: id });
		const products = await Products.find({category_id: id})
		if(Array.isArray(products)){
			products.forEach(async ({imgId}) => {
				await cloudinary.uploader.destroy(imgId)
			})
		}

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
