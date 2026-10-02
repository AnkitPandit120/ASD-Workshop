const productService = require("../services/productService");

async function getProducts(req, res, next) {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

async function replaceProduct(req, res, next) {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body,
      true,
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
};
