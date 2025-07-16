import { Sweet } from '../src/models/Sweet.js';
import { sweets } from '../src/data/sweetShopData.js';
import { addSweet } from '../src/inventory/addSweet.js';
import { restockSweet } from '../src/inventory/restockSweet.js';

// Clear the sweets array before each test
beforeEach(() => {
  sweets.length = 0;
});

// Test suite for restockSweet function
describe('restockSweet()', () => {
  test('should increase the quantity of an existing sweet', () => {
    const sweet = new Sweet(1, 'Gulab Jamun', 'Milk-Based', 10, 5);
    addSweet(sweet);

    restockSweet(1, 10);

    expect(sweets[0].quantity).toBe(15);
  });

// Test to ensure it throws an error if the sweet does not exist
  test('should handle multiple restocks correctly', () => {
    const sweet = new Sweet(2, 'Kaju Katli', 'Nut-Based', 40, 10);
    addSweet(sweet);

    restockSweet(2, 5);
    restockSweet(2, 10);

    expect(sweets[0].quantity).toBe(25);
  });

// Test to ensure it throws an error if the sweet ID is not found
  test('should throw error if sweet ID is not found', () => {
    expect(() => restockSweet(99, 10)).toThrow("Sweet not found");
  });

// Test to ensure it throws an error for invalid restock quantities
  test('should throw error if restock quantity is negative', () => {
    const sweet = new Sweet(3, 'Barfi', 'Milk-Based', 20, 8);
    addSweet(sweet);

    expect(() => restockSweet(3, -5)).toThrow("Invalid restock quantity");
  });

// Test to ensure it throws an error if restock quantity is zero
  test('should throw error if restock quantity is zero', () => {
    const sweet = new Sweet(4, 'Halwa', 'Veg-Based', 25, 10);
    addSweet(sweet);

    expect(() => restockSweet(4, 0)).toThrow("Invalid restock quantity");
  });
});
