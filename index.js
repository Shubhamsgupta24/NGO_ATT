const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const HomeController = require('./src/controllers/home.Controller');
const connection = require('./src/config/database');

const app = express();

// Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

const homeController = new HomeController();

app.get('/', homeController.getinfo);

// Connect to the database
connection.connect(function (err) {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('Database Connected!');
  
  // Start the server after the database connection is established
  app.listen(3000, () => {
    console.log('Server is running on port 3000: http://localhost:3000/');
  });
});
