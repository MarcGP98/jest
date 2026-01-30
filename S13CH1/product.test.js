const {
  resetProducts,
  addProduct,
  removeProduct,
  getProducts,
  getProduct,
  updateProduct,
} = require("./product");

beforeEach(() => {
  resetProducts();
});

describe("Adding Products", () => {
  test("should add a product", () => {
    addProduct("CocaCola", 2);
    expect(getProducts().length).toBe(1);
    expect(getProducts()[0].name).toBe("CocaCola");
    expect(getProducts()[0].price).toBe(2);
  });

  test("should fail when adding a repeated product", () => {
    addProduct("CocaCola", 2);
    expect(() => addProduct("CocaCola", 3)).toThrow("product already exists");
  });

  test("should fail when adding a product with no name", () => {
    expect(() => addProduct(undefined, 2)).toThrow("name and price are required");
  });

  test("should fail when adding a product with no price", () => {
    expect(() => addProduct("CocaCola", undefined)).toThrow(
      "name and price are required"
    );
  });

  test("should increment id by 1 each time a product is added", () => {
    const p1 = addProduct("A", 1);
    const p2 = addProduct("B", 2);
    expect(p1.id).toBe(1);
    expect(p2.id).toBe(2);
  });
});

describe("Removing Products", () => {
  test("should remove a product", () => {
    const p = addProduct("CocaCola", 2);
    removeProduct(p.id);
    expect(getProducts().length).toBe(0);
  });

  test("should fail when removing a product that does not exist", () => {
    expect(() => removeProduct(999)).toThrow("product does not exist");
  });
});

describe("Getting a single product", () => {
  test("should get a product", () => {
    const p = addProduct("CocaCola", 2);
    const found = getProduct(p.id);
    expect(found.id).toBe(p.id);
    expect(found.name).toBe("CocaCola");
  });

  test("should fail when getting a product that does not exist", () => {
    expect(() => getProduct(999)).toThrow("product does not exist");
  });
});

describe("Updating Products", () => {
  test("should update a product", () => {
    const p = addProduct("CocaCola", 2);
    const updated = updateProduct(p.id, "Pepsi", 3);
    expect(updated.name).toBe("Pepsi");
    expect(updated.price).toBe(3);
  });

  test("should fail when updating a product that does not exist", () => {
    expect(() => updateProduct(999, "X", 1)).toThrow("product does not exist");
  });

  test("should only update the price", () => {
    const p = addProduct("CocaCola", 2);
    const updated = updateProduct(p.id, undefined, 10);
    expect(updated.name).toBe("CocaCola");
    expect(updated.price).toBe(10);
  });

  test("should only update the name", () => {
    const p = addProduct("CocaCola", 2);
    const updated = updateProduct(p.id, "Fanta", undefined);
    expect(updated.name).toBe("Fanta");
    expect(updated.price).toBe(2);
  });
});