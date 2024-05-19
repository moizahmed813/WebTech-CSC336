
const express = require('express');
const connectDb = require('./Config/dbConnection');
const errorHandler = require('./Middleware/errorHandler');
const { default: mongoose } = require('mongoose');
const app = express()
const path = require('path');
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
connectDb();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'Frontend')));

app.use(express.static(__dirname + '/Frontend'));

app.get('/', (req, res) => {
    res.render('lp');
  });

app.get('/api', (req, res) => {
    res.render("api");
});

app.get('/products', (req, res) => {
    res.render("products");
});

app.get('/cart', (req, res) => {
    res.render("cart");
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.use(express.json());
app.use("/api/products", require("./Routes/productRoutes"));
app.use(errorHandler);

app.use(express.json());
app.use('/api/orders', require("./Routes/orderRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


