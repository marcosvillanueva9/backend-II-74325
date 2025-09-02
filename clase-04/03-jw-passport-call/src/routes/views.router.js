import { Router } from 'express';
//import { requireAuth } from '../middlewares/auth.js';
import { passportCall } from '../middlewares/passportAuth.js';
import User from '../models/User.js';

const router = Router();

router.get('/login', (req, res) => {
  const error = req.query.error;
  res.render('login', { error });
});

router.get('/register', (req, res) => {
  const error = req.query.error;
  res.render('register', { error });
});

router.get('/current', passportCall('jwt'), async (req, res) => {
  const user = await User.findById(req.user.id).lean();
  res.render('current', { user });
});

export default router;
