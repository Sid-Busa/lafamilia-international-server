import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import Notification from '../model/notification.js';
const router = Router();

router.post('/createNotification', async (req, res) => {
	const { name, email, subject, message } = req.body;

	try {
		const notification = await new Notification({
			name,
			email,
			subject,
			message,
		});
		await notification.save();
		res.send({
			success: true,
			notification,
			message: 'Notification is created',
		});
	} catch (error) {
		console.log('Error', error);
		res.status(500).json({ success: false, error, message: error.message });
	}
});

router.get('/getAllNotification', auth, async (req, res) => {
	try {
		const allNotification = await Notification.find();
		res.status(200).send({
			success: true,
			notification: allNotification,
			message: 'Notification Details',
		});
	} catch (error) {
		console.log('Error', error);
		res.status(500).send({ success: false, error, message: error.message });
	}
});

router.get('/getNotificationById/:id', auth, async (req, res) => {
	const { id } = req.params;
	try {
		const notification = await Notification.findById({ _id: id });
		res
			.status(200)
			.send({ success: true, notification, message: 'Notification Details' });
	} catch (error) {
		console.log('Error', error);
		res.status(500).send({ success: false, error, message: error.message });
	}
});

router.delete('/deleteCategoryById/:id', auth, async (req, res) => {
	const { id } = req.params;
	try {
		const notification = await Notification.deleteOne({ _id: id });
		res
			.status(200)
			.send({ success: true, notification, message: 'Delete Notification ' });
	} catch (error) {
		console.log('Error', error);
		res.status(500).send({ success: false, error, message: error.message });
	}
});

export default router;
