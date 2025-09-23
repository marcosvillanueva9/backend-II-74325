import express from 'express';
import mongoose from 'mongoose';

import MongoConn from './src/config/db.js';
import usersRouter from './src/routes/users.router.js';
import businessRouter from './src/routes/business.router.js';
import ordersRouter from './src/routes/orders.router.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URI = 'mongodb://localhost:27017/coder-eats';

const dbConn = new MongoConn()
await dbConn.connect(MONGO_URI)

app.use('/api/users', usersRouter);
app.use('/api/business', businessRouter);
app.use('/api/orders', ordersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });