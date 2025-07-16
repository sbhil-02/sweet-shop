export class Sweet {
  constructor(id, name, category, price, quantity) {
    if (!id || !name || !category || price < 0 || quantity < 0) {
      throw new Error("Invalid sweet details");
    }
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
  }
}
