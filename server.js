const express = require("express");
const fs= require("fs/promises")
const app = express();
const path = require("path");

const location = path.join(__dirname, "db.json");

async function readProducts() {
    try{
        const data = await fs.readFile(location, "utf8");
        return JSON.parse(data)
    }catch (err){
        console.log(err)
    }
}

app.get("/products", async (req, res) => {
    try {
        const products = await readProducts();
        console.log(products)
        res.json(products)
    } catch (error) {
        console.error(error);
    }
});

// app.post("/", (req, res) => {
//     res.send("data received");
// });


app.listen(3000, () => {
    console.log("server start");
});
