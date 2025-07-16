// ===== server.js =====
import express from 'express';
import cors from 'cors';

import { sweets } from './src/data/sweetShopData.js';
import { Sweet } from './src/models/Sweet.js';
import { addSweet } from './src/inventory/addSweet.js';
import { deleteSweet } from './src/inventory/deleteSweet.js';
import { restockSweet } from './src/inventory/restockSweet.js';
import { purchaseSweet } from './src/operations/purchaseSweet.js';

const app = express();
const PORT = 3000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ GET all sweets
app.get('/sweets', (req, res) => {
  res.json(sweets);
});

// ✅ POST /add - add a new sweet
app.post('/add', (req, res) => {
  try {
    const { id, name, category, price, quantity } = req.body;
    const sweet = new Sweet(id, name, category, price, quantity);
    addSweet(sweet);
    res.status(201).json({ message: 'Sweet added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ DELETE /delete/:id - delete a sweet
app.delete('/delete/:id', (req, res) => {
  try {
    deleteSweet(Number(req.params.id));
    res.json({ message: 'Sweet deleted successfully' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// ✅ POST /restock/:id - restock a sweet
app.post('/restock/:id', (req, res) => {
  try {
    const quantity = Number(req.body.quantity);
    restockSweet(Number(req.params.id), quantity);
    res.json({ message: 'Sweet restocked successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ POST /purchase/:id - purchase a sweet
app.post('/purchase/:id', (req, res) => {
  try {
    const quantity = Number(req.body.quantity);
    purchaseSweet(Number(req.params.id), quantity);
    res.json({ message: 'Sweet purchased successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
