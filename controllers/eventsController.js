import * as eventModel from '../models/event.js';

export const createEvent = (req, res) => {
  try {
    const { name, date, description } = req.body;
    if (!name || !date) {
      return res.status(400).json({ error: 'Name and date are required.' });
    }
    const event = eventModel.createEvent(name, date, description || '');
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
    const event = eventModel.updateEvent(id, { name, date, description });
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEvent = (req, res) => {
  try {
    const { id } = req.params;
    const event = eventModel.deleteEvent(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }
    res.json({ message: 'Event deleted.', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
