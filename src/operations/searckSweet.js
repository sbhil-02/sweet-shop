import { sweets } from '../data/sweetShopData.js';

// This module provides functions to search for sweets by name, category, and price range.
export function searchByName(name) {
  return sweets.filter(sweet =>
    sweet.name.toLowerCase().includes(name.toLowerCase())
  );
}

export function searchByCategory(category) {
  return sweets.filter(sweet =>
    sweet.category.toLowerCase() === category.toLowerCase()
  );
}

export function searchByPriceRange(min, max) {
  return sweets.filter(sweet =>
    sweet.price >= min && sweet.price <= max
  );
}
