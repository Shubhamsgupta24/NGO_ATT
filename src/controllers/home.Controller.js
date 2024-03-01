
const connection = require('../config/database');

class HomeController {
  HomeInfo(req, res, next) {
    res.render('home', {title: "home", email: req.session.email });
  }
}

module.exports = HomeController;
