class HomeController {
  getinfo(req, res, next) {
    let users = [{ name: 'John' }, { name: 'Jane' }, { name: 'Bob' }];
    res.render('home', { users: users });
  }
}

module.exports = HomeController;
