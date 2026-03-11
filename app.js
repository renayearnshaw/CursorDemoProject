import express from 'express';
import { initializeDatabase } from './db.js';
import usersRoutes from './routes/users.js';

try {
  initializeDatabase();
} catch (err) {
  console.error('Failed to initialise database:', err.message);
  process.exit(1);
}

const app = express();
app.use(express.json());

app.use('/users', usersRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
