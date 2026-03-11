import { Router } from 'express';
import { signup, signin } from '../controllers/usersController.js';

export const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);

