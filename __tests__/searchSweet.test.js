import { Sweet } from '../src/models/Sweet.js';
import { sweets } from '../src/data/sweetShopData.js';
import { addSweet } from '../src/inventory/addSweet.js';
import {
  searchByName,
  searchByCategory,
  searchByPriceRange,
} from '../src/operations/searchSweet.js';

// Clear the sweets array before each test
beforeEach(() => {
  sweets.length = 0;
});

// Test suite for searchSweet function
describe('searchSweet()', () => {
  beforeEach(() => {
    addSweet(new Sweet(1, 'Kaju Katli', 'Nut-Based', 50, 10));
    addSweet(new Sweet(2, 'Gulab Jamun', 'Milk-Based', 30, 20));
    addSweet(new Sweet(3, 'Halwa', 'Veg-Based', 25, 5));
    addSweet(new Sweet(4, 'Rasgulla', 'Milk-Based', 35, 15));
  });

  // 🔍 Name Search
  test('should return sweets matching name (case insensitive)', () => {
    const result = searchByName('gulab');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Gulab Jamun');
  });

// Test to ensure it returns an empty array if no name matches
  test('should return empty array if no name matches', () => {
    const result = searchByName('Ladoo');
    expect(result).toEqual([]);
  });

  // 🏷️ Category Search
  test('should return sweets matching category (case insensitive)', () => {
    const result = searchByCategory('milk-based');
    expect(result.length).toBe(2);
    expect(result.map(s => s.name)).toContain('Gulab Jamun');
    expect(result.map(s => s.name)).toContain('Rasgulla');
  });

// Test to ensure it returns an empty array if no category matches
  test('should return empty array for invalid category', () => {
    const result = searchByCategory('DryFruit');
    expect(result).toEqual([]);
  });

  // 💰 Price Range Search
  test('should return sweets in the price range', () => {
    const result = searchByPriceRange(30, 50);
    expect(result.length).toBe(3);
    expect(result.map(s => s.name)).toContain('Kaju Katli');
    expect(result.map(s => s.name)).toContain('Gulab Jamun');
    expect(result.map(s => s.name)).toContain('Rasgulla');
  });

// Test to ensure it returns an empty array if no sweets are in the price range
  test('should return empty array if no sweet is in price range', () => {
    const result = searchByPriceRange(60, 100);
    expect(result).toEqual([]);
  });

// Test to ensure it handles edge cases correctly
  test('should work with equal min and max price', () => {
    const result = searchByPriceRange(25, 25);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Halwa');
  });

// Test to ensure it throws an error for invalid price ranges
  test('should throw error if min price is negative', () => {
    expect(() => searchByPriceRange(-10, 50)).toThrow("Invalid price range");
  });

// Test to ensure it throws an error if max price is negative
  test('should throw error if max price is negative', () => {
    expect(() => searchByPriceRange(10, -50)).toThrow("Invalid price range");
  });

// Test to ensure it throws an error if min price is greater than max price
  test('should throw error if min price > max price', () => {
    expect(() => searchByPriceRange(60, 20)).toThrow("Invalid price range");
  });

});

