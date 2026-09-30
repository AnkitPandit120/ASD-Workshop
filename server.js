const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("server is running");
});

app.post("/", (req, res) => {
    res.send("data received");
});

app.listen(3000, () => {
    console.log("server start");
});
