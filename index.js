import express from 'express';
import cors from 'cors';
import connect from 'connect';
import Connection from './connection/db.js';
import Login from './routes/login.js';
import Category from './routes/category.js';
import Product from './routes/products.js';
import Notification from './routes/notification.js';
import compression from 'compression'
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary'

const app = express();

cloudinary.config({ 
  cloud_name: 'lafamilia', 
  api_key: '379798741788234', 
  api_secret: 'nzEGkMlNXouwtdwqk1U_b_V_pxc',
  secure: true
});

Connection();

let corsOptions = {
	origin: '*',
};
app.use(express.json({ limit: '50mb' }));
app.use(fileUpload({
	useTempFiles:true
}))
app.use(cors(corsOptions));

app.use(compression())

app.use('/api/auth', Login);
app.use('/api/category', Category);
app.use('/api/product', Product);
app.use('/api/notification', Notification);

app.listen(process.env.PORT || 4000, () => console.log(`Server listening on port :-  ${process.env.PORT || 4000}`));
