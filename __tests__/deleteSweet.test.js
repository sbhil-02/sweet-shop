import { sweets } from '../src/data/sweetShopData.js';
import { addSweet } from '../src/inventory/addSweet.js';
import { deleteSweet } from '../src/inventory/deleteSweet.js';

beforeEach(() => {
  sweets.length = 0;
});

describe('deleteSweet()', () => {
  test('should delete a sweet by ID', () => {
    const sweet = new Sweet(1, 'Barfi', 'Milk-Based', 25, 10);
    addSweet(sweet);

    deleteSweet(1);

    expect(sweets.length).toBe(0);
  });

  test('should not delete anything if wrong ID is given', () => {
    const sweet = new Sweet(1, 'Halwa', 'Veg-Based', 40, 5);
    addSweet(sweet);

    expect(() => deleteSweet(99)).toThrow("Sweet not found");
    expect(sweets.length).toBe(1);
  });

  test('should handle deleting multiple sweets one after another', () => {
    const sweet1 = new Sweet(1, 'Gulab Jamun', 'Milk-Based', 10, 20);
    const sweet2 = new Sweet(2, 'Rasgulla', 'Milk-Based', 12, 25);

    addSweet(sweet1);
    addSweet(sweet2);

    deleteSweet(1);
    expect(sweets.length).toBe(1);
    expect(sweets[0].id).toBe(2);

    deleteSweet(2);
    expect(sweets.length).toBe(0);
  });

  test('should throw error if sweets array is empty', () => {
    expect(() => deleteSweet(1)).toThrow("Sweet not found");
  });
});
