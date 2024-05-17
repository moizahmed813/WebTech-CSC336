
const express = require('express');
const connectDb = require('./Config/dbConnection');
const errorHandler = require('./Middleware/errorHandler');
const { default: mongoose } = require('mongoose');
const app = express()
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');

connectDb();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/Frontend'));

app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/Frontend/lp.html');
    res.render("lp");
});

app.get('/', (req, res) => {
    res.render("api");
});

app.get('/', (req, res) => {
    res.render("products");
});


app.use(express.json());
app.use("/api/products", require("./Routes/productRoutes"));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


