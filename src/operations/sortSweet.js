import { sweets } from '../data/sweetShopData.js';

// This module provides a function to sort sweets by various attributes.
export function sortBy(key, order = 'asc') {
  const validKeys = ['name', 'category', 'price'];
  const validOrders = ['asc', 'desc'];

// Validate the sort key and order
  if (!validKeys.includes(key)) {
    throw new Error("Invalid sort key");
  }

  if (!validOrders.includes(order)) {
    throw new Error("Invalid sort order");
  }

// Sort the sweets array based on the provided key and order
  const sorted = [...sweets].sort((a, b) => {
    if (typeof a[key] === 'string') {
      return a[key].localeCompare(b[key]);
    }
    return a[key] - b[key];
  });

// Reverse the sorted array if the order is 'desc'
  return order === 'desc' ? sorted.reverse() : sorted;
}
