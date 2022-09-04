import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
	const token = req.headers['authorization'];

	if (!token) {
		return res.status(401).send({ success: false, message: 'Invalid user' });
	}

	try {
		const decoded = await jwt.verify(token, process.env.TOKEN_KEY);
		const { name, password } = decoded;

		if (
			name !== process.env.ADMIN_NAME &&
			password !== process.env.ADMIN_PASS
		) {
			return res
				.status(401)
				.send({ success: false, message: 'User not exist' });
		}
	} catch (err) {
		console.log(err);
		return res.status(400).send({ success: false, message: 'Invalid user' });
	}
	return next();
};
