const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const connection = require('./src/config/database');
const bodyParser = require('body-parser'); // Add this line
const session = require('express-session');

const app = express();

app.use(
  session({
    name:'NGO',
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
)

// Middleware
app.use(ejsLayouts);
app.set('layout extractStyles',true);
// app.set('layout extractScript',true);
app.use(express.static('./src/assets'));
app.use(bodyParser.urlencoded({ extended: true })); // Add this line
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Require HomeController after app is declared
const HomeController = require('./src/controllers/home.Controller');
const homeController = new HomeController();

// Require routes
const homeRoutes = require('./src/routes/index');

app.use('/', homeRoutes);

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
