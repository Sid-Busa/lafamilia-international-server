import express from 'express';
import cors from 'cors';
import Connection from './connection/db.js';
import Login from './routes/login.js';
import Category from './routes/category.js';
import Product from './routes/products.js';
import Notification from './routes/notification.js';

const app = express();
Connection();

let corsOptions = {
	origin: '*',
};
app.use(express.json({ limit: '50mb' }));
app.use(cors(corsOptions));

app.use('/api/auth', Login);
app.use('/api/category', Category);
app.use('/api/product', Product);
app.use('/api/notification', Notification);

app.listen(process.env.PORT || 4000, () => console.log(`Server listening on port :-  ${process.env.PORT || 4000}`));
