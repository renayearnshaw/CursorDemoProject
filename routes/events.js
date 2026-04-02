import { Router } from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
} from '../controllers/eventsController.js';
import { authenticateToken } from '../util/auth.js';
import { upload } from '../util/upload.js';

export const router = Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', authenticateToken, upload.single('image'), createEvent);
router.put('/:id', authenticateToken, upload.single('image'), updateEvent);
router.delete('/:id', authenticateToken, deleteEvent);
router.post('/:id/register', authenticateToken, registerForEvent);
router.delete('/:id/unregister', authenticateToken, unregisterFromEvent);
