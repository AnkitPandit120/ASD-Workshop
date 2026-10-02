const { readProducts, writeProducts } = require("../database/productDatabase");

async function readfilewithdelay() {
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
  return readProducts();
}

async function getProducts() {
  return readfilewithdelay();
}

async function getProductById(id) {
  const products = await readfilewithdelay();
  return products.find((item) => item.id === Number(id));
}

async function createProduct(productData) {
  const products = await readProducts();
  const id =
    products.reduce((maxId, item) => Math.max(maxId, Number(item.id) || 0), 0) +
    1;
  const product = { ...productData, id };
  products.push(product);
  await writeProducts(products);
  return product;
}

async function updateProduct(id, productData, replace = false) {
  const products = await readProducts();
  const index = products.findIndex((item) => item.id === Number(id));
  if (index === -1) {
    return null;
  }

  products[index] = replace
    ? { ...productData, id: Number(id) }
    : { ...products[index], ...productData, id: Number(id) };
  await writeProducts(products);
  return products[index];
}

async function deleteProduct(id) {
  const products = await readProducts();
  const index = products.findIndex((item) => item.id === Number(id));
  if (index === -1) {
    return null;
  }

  const [product] = products.splice(index, 1);
  await writeProducts(products);
  return product;
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
