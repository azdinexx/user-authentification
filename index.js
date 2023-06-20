// Description: This file is the entry point of the application.
// Author : Azdine Bouali
// [ 09-06-2020 ] Morocco

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./src/Config/db');
db();
const port = process.env.PORT || 3000;
const app = express();

// import routes
const auth = require('./src/Routes/auth');
const user = require('./src/Routes/userRoutes');
const admin = require('./src/Routes/admin');
const { verifyToken } = require('./src/Middlewares/verifyToken');
const { verifyAdmin } = require('./src/Middlewares/verifyAdmin');

// route middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//auth route
app.use('/auth', auth);

// verify token
app.use(verifyToken);
//user route
app.use('/user', user);

// admin route
app.use('/admin', verifyAdmin, admin);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
