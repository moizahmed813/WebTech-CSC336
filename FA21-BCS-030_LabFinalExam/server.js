
const express = require('express');
const connectDb = require('./Config/dbConnection');
const errorHandler = require('./Middleware/errorHandler');
const { default: mongoose } = require('mongoose');
const app = express()
const path = require('path');
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
var session = require("express-session");
const bcrypt = require('bcrypt');
const Admin = require('./Models/adminModel');
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


app.use(session({ secret: process.env.SESSION_SECRET,
     resave: false,
     saveUninitialized: true,
     cookie: { maxAge: 3600000 }
}));

function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.redirect('/login');
    }
}

app.use(express.json());

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try{const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Admin({ email, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: 'Admin added successfully' });
    } catch(err){
        res.status(500).json({ message: 'Error adding admin', err });
    }   
  });

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/admin', requireAuth, (req, res) => {
    res.render('admin');
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user._id;
      res.redirect('/admin');
    } else {
        res.redirect('/login');
    }
  });
  
  app.get("/logout", (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/login');
        }
    });
  });

app.use('/api/products', require("./Routes/productRoutes"));

  app.get('/product-details/:id', (req, res) => {
    res.render('product-details', { productId: req.params.id });
});
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


