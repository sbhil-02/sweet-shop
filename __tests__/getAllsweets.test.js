import { Sweet } from '../src/models/Sweet.js';
import { sweets } from '../src/data/sweetShopData.js';
import { addSweet } from '../src/inventory/addSweet.js';
import { getAllSweets } from '../src/inventory/getAllSweets.js';

// Clear the sweets array before each test
beforeEach(() => {
  sweets.length = 0;
});

// Test suite for getAllSweets function
describe('getAllSweets()', () => {
  test('should return all sweets added', () => {
    const sweet1 = new Sweet(1, 'Kaju Katli', 'Nut-Based', 50, 10);
    const sweet2 = new Sweet(2, 'Rasgulla', 'Milk-Based', 30, 20);

    addSweet(sweet1);
    addSweet(sweet2);

    const all = getAllSweets();
    expect(all.length).toBe(2);
    expect(all[0].name).toBe('Kaju Katli');
    expect(all[1].name).toBe('Rasgulla');
  });

// Test to ensure it returns an empty array if no sweets exist!
  test('should return an empty array if no sweets exist', () => {
    const all = getAllSweets();
    expect(all.length).toBe(0);
    expect(all).toEqual([]);
  });

// Test to ensure it returns a new array (not reference to original)

  test('should return a new array (not reference to original)', () => {
    const sweet = new Sweet(1, 'Barfi', 'Milk-Based', 20, 5);
    addSweet(sweet);

    const all = getAllSweets();
    all.pop();  // mutate the returned array

    expect(sweets.length).toBe(1); // original should remain unchanged!
  });

});
