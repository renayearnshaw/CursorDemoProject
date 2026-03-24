import { Router } from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/eventsController.js';
import { authenticateToken } from '../util/auth.js';

export const router = Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', authenticateToken, createEvent);
router.put('/:id', authenticateToken, updateEvent);
router.delete('/:id', authenticateToken, deleteEvent);
