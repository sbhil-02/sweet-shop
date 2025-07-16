import { sweets } from '../data/sweetShopData.js';
import { Sweet } from '../models/Sweet.js';

export function addSweet(sweet) {
  // Check if the input is an instance of Sweet
  if (!(sweet instanceof Sweet)) {
    throw new Error("Input must be an instance of Sweet");
  }

  // Check if sweet with the same ID already exists
  const exists = sweets.find(s => s.id === sweet.id);
  if (exists) {
    throw new Error("Sweet with this ID already exists");
  }

  sweets.push(sweet);
}
