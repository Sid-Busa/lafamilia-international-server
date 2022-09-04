import { Router } from 'express';
import jwt from 'jsonwebtoken';
const router = Router();

router.post('/login', async (req, res) => {
	const { password, name } = req.body;
	try {
		if (
			name !== process.env.ADMIN_NAME ||
			password !== process.env.ADMIN_PASS
		) {
			res
				.status(400)
				.send({ success: false, message: 'Invalid Username/Password' });
			return;
		}

		const token = jwt.sign({ name, password }, process.env.TOKEN_KEY, {
			expiresIn: '1d',
		});

		res
			.status(200)
			.send({ success: true, token, message: 'Login Successfull' });
	} catch (error) {
		console.log('Error', error);
		res.status(204).send({ success: false, error, message: error.message });
	}
});

export default router;
