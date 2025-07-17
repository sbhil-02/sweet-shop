import { Sweet } from '../src/models/Sweet.js';
import { sweets } from '../src/data/sweetShopData.js';
import { addSweet } from '../src/inventory/addSweet.js';
import { purchaseSweet } from '../src/operations/purchaseSweet.js';

// Clear the sweets array before each test
beforeEach(() => {
  sweets.length = 0;
});

// Test suite for purchaseSweet function
describe('purchaseSweet()', () => {
  test('should reduce the quantity when sweet is purchased', () => {
    const sweet = new Sweet(1, 'Barfi', 'Milk-Based', 20, 10);
    addSweet(sweet);

    purchaseSweet(1, 3);

    expect(sweets[0].quantity).toBe(7);
  });

 // Test to ensure it throws an error if the sweet does not exist
  test('should handle multiple purchases', () => {
    const sweet = new Sweet(2, 'Kaju Katli', 'Nut-Based', 50, 15);
    addSweet(sweet);

    purchaseSweet(2, 5);
    purchaseSweet(2, 5);

    expect(sweets[0].quantity).toBe(5);
  });

// Test to ensure it throws an error if the sweet ID does not exist!

  test('should throw error if sweet ID does not exist', () => {
    expect(() => purchaseSweet(99, 2)).toThrow("Sweet not found");
  });

// Test to ensure it throws an error if purchase quantity exceeds stock

  test('should throw error if purchase quantity exceeds stock', () => {
    const sweet = new Sweet(3, 'Halwa', 'Veg-Based', 25, 4);
    addSweet(sweet);

    expect(() => purchaseSweet(3, 5)).toThrow("Insufficient stock");
  });

// Test to ensure it throws an error for invalid purchase quantities

  test('should throw error for zero or negative quantity', () => {
    const sweet = new Sweet(4, 'Rasgulla', 'Milk-Based', 10, 20);
    addSweet(sweet);

    expect(() => purchaseSweet(4, 0)).toThrow("Invalid purchase quantity");
    expect(() => purchaseSweet(4, -3)).toThrow("Invalid purchase quantity");
  });
});
