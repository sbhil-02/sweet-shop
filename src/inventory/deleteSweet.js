import { sweets } from '../data/sweetShopData.js';

// This function deletes a sweet from the sweets array by its ID.!

export function deleteSweet(id) {
  const index = sweets.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error("Sweet not found");
  }
  // Find the index of the sweet with the given ID
  sweets.splice(index, 1);
}
