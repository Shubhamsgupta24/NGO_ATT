
const connection = require('../config/database');

class HomeController {
  getinfo(req, res, next) {
      try {
        let sql = "SELECT * FROM user";
        connection.query(sql, function (err, result) {
          if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
          }
    
          res.render('home', { users: result });
        });
      } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
  }
}

module.exports = HomeController;
