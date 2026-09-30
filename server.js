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

// create a function called readfile with delay , delay the readfile settiem out 1500 




app.get("/products/:id", async (req, res) => {
    try {
        const products = await readProducts();

        let id= req.params.id
        id=Number(id)
        let product= products.find((item)=> item.id==id)
        res.json(product)

    } catch (error) {
        console.error(error);
    }
});


app.listen(3000, () => {
    console.log("server start");
});
