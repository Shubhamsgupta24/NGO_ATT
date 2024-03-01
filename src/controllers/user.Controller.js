const connection = require('../config/database');

class UserController {
    signIn(req, res, next) {
        res.render('sign_in', {
            title: "sign in page"
        });
    }

    signUp(req, res, next) {
        res.render('sign_up', {
            title: "sign up page"
        });
    }

    //destroy session
    logout(req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/user/sign_in');
        })
    }

    createSession(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;

        // Assuming you have a table named 'users' with columns 'email' and 'password'
        const query = `SELECT * FROM user WHERE email = ? AND password = ?`;

        connection.query(query, [email, password], (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
                return;
            }

            if (results.length > 0) {
                // User with the requested email and password found
                // Handle the success case here
                req.session.email = email;
                console.log(req.session.email);
                console.log(req.session);
                console.log('User found:', results[0]);
                res.render('home', {
                    title: 'home page',
                    email: req.session.email
                });
                return;
            } else {
                // User not found or credentials are incorrect
                // Handle the failure case here
                console.log('User not found or incorrect credentials');
            }

            // Render the sign-up page regardless of the result
            res.render('home', {
                title: 'Home'
            });
        });
    }

    create(req, res, next) 
    {
        const { full_name, email, password, confirm_password } = req.body;

        // Check if passwords match
        if (password !== confirm_password) {
            return res.status(400).send('Passwords do not match');
        }

        // Insert data into the database
        const insertQuery = `INSERT INTO user (full_name, email, password) VALUES (?, ?, ?)`;
        connection.query(insertQuery, [full_name, email, password], (error, results) => {
            if (error) {
                console.error('Error inserting data: ', error);
                return res.status(500).send('Error inserting data');
            }

            res.redirect('/user/sign_in');
        });
    }
}

module.exports = UserController;
