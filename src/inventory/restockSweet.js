import { sweets } from '../data/sweetShopData.js';

export function restockSweet(id, quantity) {
  if (quantity <= 0) {
    throw new Error("Invalid restock quantity");
  }

  const sweet = sweets.find(s => s.id === id);
  if (!sweet) {
    throw new Error("Sweet not found");
  }

  sweet.quantity += quantity;
}
