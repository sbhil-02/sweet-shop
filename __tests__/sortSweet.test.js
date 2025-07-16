import { Sweet } from '../src/models/Sweet.js';
import { sweets } from '../src/data/sweetShopData.js';
import { addSweet } from '../src/inventory/addSweet.js';
import { sortBy } from '../src/operations/sortSweet.js';

// Clear the sweets array before each test
beforeEach(() => {
  sweets.length = 0;
});

// Test suite for sortSweet function
describe('sortSweet()', () => {
  beforeEach(() => {
    addSweet(new Sweet(1, 'Gulab Jamun', 'Milk-Based', 30, 20));
    addSweet(new Sweet(2, 'Kaju Katli', 'Nut-Based', 50, 15));
    addSweet(new Sweet(3, 'Halwa', 'Veg-Based', 25, 10));
  });

// Test to ensure it sorts sweets by name, category, and price
  test('should sort sweets by name (A-Z)', () => {
    const sorted = sortBy('name');
    expect(sorted.map(s => s.name)).toEqual(['Gulab Jamun', 'Halwa', 'Kaju Katli']);
  });

// Test to ensure it sorts sweets by category (A-Z)
  test('should sort sweets by category (A-Z)', () => {
    const sorted = sortBy('category');
    expect(sorted.map(s => s.category)).toEqual(['Milk-Based', 'Nut-Based', 'Veg-Based']);
  });

// Test to ensure it sorts sweets by price in ascending and descending order
  test('should sort sweets by price (ascending)', () => {
    const sorted = sortBy('price');
    expect(sorted.map(s => s.price)).toEqual([25, 30, 50]);
  });

  test('should sort sweets by price in descending order', () => {
    const sorted = sortBy('price', 'desc');
    expect(sorted.map(s => s.price)).toEqual([50, 30, 25]);
  });

// Test to ensure it throws an error for invalid sort orders
  test('should throw error if sort order is invalid', () => {
    expect(() => sortBy('price', 'reverse')).toThrow("Invalid sort order");
  });

// Test to ensure it returns an empty array if no sweets are present
  test('should return a new array, not reference', () => {
    const sorted = sortBy('name');
    expect(sorted).not.toBe(sweets);
  });

// Test to ensure it throws an error if the sort key is invalid
  test('should throw error on invalid sort key', () => {
    expect(() => sortBy('flavor')).toThrow("Invalid sort key");
  });
});
