const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

app.use("/products", productRoutes);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("server start");
});
