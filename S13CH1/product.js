let products = [];
let id = 0;

function resetProducts() {
  products = [];
  id = 0;
}

function getProducts() {
  return products;
}

function addProduct(name, price) {
  if (name === undefined || price === undefined) {
    throw new Error("name and price are required");
  }

  const exists = products.some((p) => p.name === name);
  if (exists) {
    throw new Error("product already exists");
  }

  id = id + 1;

  const newProduct = { id, name, price };
  products.push(newProduct);

  return newProduct;
}

function removeProduct(productId) {
  const index = products.findIndex((p) => p.id === productId);

  if (index === -1) {
    throw new Error("product does not exist");
  }

  products.splice(index, 1);
}

function getProduct(productId) {
  const product = products.find((p) => p.id === productId);

  if (!product) {
    throw new Error("product does not exist");
  }

  return product;
}

function updateProduct(productId, name, price) {
  const product = products.find((p) => p.id === productId);

  if (!product) {
    throw new Error("product does not exist");
  }

  if (name !== undefined) {
    product.name = name;
  }

  if (price !== undefined) {
    product.price = price;
  }

  return product;
}

module.exports = {
  resetProducts,
  addProduct,
  removeProduct,
  getProducts,
  getProduct,
  updateProduct,
};