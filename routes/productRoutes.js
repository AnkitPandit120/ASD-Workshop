const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  cacheMiddleware,
  invalidateCache,
} = require("../middleware/cacheMiddleware");

const productRouter = express.Router();

productRouter.get("/", cacheMiddleware, getProducts);
productRouter.get("/:id", cacheMiddleware, getProductById);
productRouter.post("/", invalidateCache, createProduct);
productRouter.put("/:id", invalidateCache, replaceProduct);
productRouter.patch("/:id", invalidateCache, updateProduct);
productRouter.delete("/:id", invalidateCache, deleteProduct);

module.exports = productRouter;
