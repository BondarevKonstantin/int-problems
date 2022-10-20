import express from 'express';
import dotenv from 'dotenv';
import router from './router.js';
import morgan from 'morgan';
import path from 'path';

import { signin, createNewUser } from './handlers/user.js';
import { protect } from './modules/auth.js';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')),
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
