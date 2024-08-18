class Product {
  static VALID_PRODUCT_NAMES = ["A", "B", "C", "D"];
  constructor(name, price, image = "") {
    if (!Product.VALID_PRODUCT_NAMES.includes(name)) {
      throw new Error("Invalid product name.");
    }

    if (isNaN(price) || price <= 0) {
      throw new Error("Invalid product price.");
    }

    this.name = name;
    this.price = price;
    this.image = image;
  }
}
