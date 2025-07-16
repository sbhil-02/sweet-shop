import { sweets } from '../data/sweetShopData.js';

export function purchaseSweet(id, quantity) {
  // Validate the purchase quantity
    if (quantity <= 0) {
    throw new Error("Invalid purchase quantity");
  }

    // Find the sweet by ID
  const sweet = sweets.find(s => s.id === id);
  if (!sweet) {
    throw new Error("Sweet not found");
  }

    // Check if the quantity is available
  if (sweet.quantity < quantity) {
    throw new Error("Insufficient stock");
  }

  sweet.quantity -= quantity;
}
// This function handles the purchase of a sweet by its ID and reduces its quantity accordingly.