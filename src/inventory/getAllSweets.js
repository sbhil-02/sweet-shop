import { sweets } from '../data/sweetShopData.js';

export function getAllSweets() {
  return [...sweets]; // return a shallow copy!
}
