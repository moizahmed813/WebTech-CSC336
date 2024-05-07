
const express = require('express')
const app = express()
const dotenv = require("dotenv").config();

app.use(express.static(__dirname + '/Frontend'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Frontend/lp.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Frontend/api.html');
});

app.use(express.json());
app.use("/api/products", require("./Routes/productRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


