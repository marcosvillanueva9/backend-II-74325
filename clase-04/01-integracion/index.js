import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import apiUsersRouter from './src/routes/user.router.js';
import usersViewsRouter from './src/routes/views.router.js';
import connectDB from './src/config/db.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('public'));

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', 'views');

// Rutas
app.use('/users', apiUsersRouter);
app.use('/', usersViewsRouter);

// Mongo y servidor
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
});
