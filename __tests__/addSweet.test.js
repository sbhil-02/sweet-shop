import { sweets } from '../src/data/sweetShopData.js';
import { Sweet } from '../src/models/Sweet.js';

// test-1
beforeEach(() => {
  // clear the sweets array before each test
  sweets.length = 0;
});

// test-2
describe('addSweet()', () => {
  test('should add a new sweet to the inventory', () => {
    const sweet = new Sweet(1, 'Kaju Katli', 'Nut-Based', 50, 20);
    addSweet(sweet);
    expect(sweets.length).toBe(1);
    expect(sweets[0].name).toBe('Kaju Katli');
  });

// test-3
  test('should throw error if sweet with same ID already exists', () => {
    const sweet1 = new Sweet(1, 'Kaju Katli', 'Nut-Based', 50, 20);
    const sweet2 = new Sweet(1, 'Gulab Jamun', 'Milk-Based', 20, 30);
    addSweet(sweet1);
    expect(() => addSweet(sweet2)).toThrow("Sweet with this ID already exists");
  });

  // test-4
  test('should handle adding multiple valid sweets', () => {
    const sweet1 = new Sweet(1, 'Barfi', 'Milk-Based', 30, 10);
    const sweet2 = new Sweet(2, 'Halwa', 'Vegetable-Based', 40, 5);
    addSweet(sweet1);
    addSweet(sweet2);
    expect(sweets.length).toBe(2);
    expect(sweets.map(s => s.name)).toContain('Halwa');
  });

// test-5
  describe('Sweet Constructor Validations', () => {
  const invalidInputs = [
    [null, 'Valid Name', 'Category', 10, 10],
    [1, '', 'Category', 10, 10],
    [2, 'Valid Name', 'Category', -10, 5],
    [3, 'Valid Name', 'Category', 10, -5]
  ];

   test.each(invalidInputs)(
    'should throw error for invalid sweet details: id=%s, name=%s, category=%s, price=%s, quantity=%s',
    (id, name, category, price, quantity) => {
      expect(() => new Sweet(id, name, category, price, quantity)).toThrow("Invalid sweet details");
    }
  );
});

// test-6
  test('should throw error if input is not a Sweet instance', () => {
    const fakeSweet = { id: 3, name: 'Invalid', category: 'Unknown', price: 10, quantity: 10 };
    expect(() => addSweet(fakeSweet)).toThrow("Input must be an instance of Sweet");
  });
});
