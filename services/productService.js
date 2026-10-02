const { readProducts } = require("../database/productDatabase");

const cache = {};

async function readfilewithdelay() {
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
  return readProducts();
}

async function getProducts() {
  const key = "/products";
  if (cache[key]) {
    return cache[key];
  }

  const products = await readfilewithdelay();
  cache[key] = products;
  return products;
}

async function getProductById(id) {
  const key = `/products/${id}`;
  if (cache[key]) {
    return cache[key];
  }

  const products = await readfilewithdelay();
  const product = products.find((item) => item.id === Number(id));
  cache[key] = product;
  return product;
}

module.exports = { getProducts, getProductById };