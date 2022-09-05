import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import blogRoutes from './routes/blog-routes.js';
import authRoutes from './routes//auth-routes.js';
import userRoutes from './routes/user-routes.js';
import categoryRoutes from './routes/category-routes.js';
import tagRoutes from './routes/tag-routes.js';
import formRoutes from './routes/form-routes.js';

dotenv.config();

// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// cors
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes middleware
app.use('/api', blogRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);
app.use('/api', formRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Up and running on port: ${port}`));
