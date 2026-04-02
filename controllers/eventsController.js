import * as eventModel from '../models/event.js';

export const createEvent = (req, res) => {
  try {
    const { name, date, description } = req.body;
    const image = req.file;
    const userId = req.user.id;
    // Basic non-empty check
    if (!name?.trim() || !date?.trim()) {
      return res.status(400).json({ error: 'Name and date are required.' });
    }
    if (!image) {
      return res.status(400).json({ error: 'Image is required.' });
    }
    if (isNaN(Date.parse(date))) {
      return res.status(400).json({ error: 'Invalid date format.' });
    }
    const event = eventModel.createEvent(name, date, description || '', userId, image.filename);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEvents = (req, res) => {
  try {
    const events = eventModel.findAll();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEventById = (req, res) => {
  try {
    const { id } = req.params;
    const event = eventModel.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEvent = (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, description } = req.body;
    const image = req.file;
    if (!name?.trim() || !date?.trim()) {
      return res.status(400).json({ error: 'Name and date are required.' });
    }
    if (!image) {
      return res.status(400).json({ error: 'Image is required.' });
    }
    if (isNaN(Date.parse(date))) {
      return res.status(400).json({ error: 'Invalid date format.' });
    }
    const existing = eventModel.findById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Event not found - nothing to update.' });
    }
    if (String(req.user.id) !== String(existing.userId)) {
      return res.status(403).json({ error: 'Forbidden - you are not the owner of this event.' });
    }
    const event = eventModel.updateEvent(id, { name, date, description, image: image.filename });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEvent = (req, res) => {
  try {
    const { id } = req.params;
    const existing = eventModel.findById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Event not found - nothing to delete.' });
    }
    if (String(req.user.id) !== String(existing.userId)) {
      return res.status(403).json({ error: 'Forbidden - you are not the owner of this event.' });
    }
    const event = eventModel.deleteEvent(id);
    res.json({ message: 'Event deleted.', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerForEvent = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const event = eventModel.registerForEvent(id, userId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found - nothing to register for.' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const unregisterFromEvent = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const event = eventModel.unregisterFromEvent(id, userId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found - nothing to unregister from.' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};