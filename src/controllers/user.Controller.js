const connection = require('../config/database');

class UserController 
{
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
    logout(req,res,next){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }
            res.redirect('/user/sign_in');
        })
    }

    createSession(req, res, next) 
    {
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
                req.session.email=email;
                console.log(req.session.email);
                console.log(req.session);
                console.log('User found:', results[0]);
                res.render('profile', {
                    title: 'home page',
                    users: results[0],
                    email:req.session.email
                });
                return;
            } else {
                // User not found or credentials are incorrect
                // Handle the failure case here
                console.log('User not found or incorrect credentials');
            }

            // Render the sign-up page regardless of the result
            res.render('sign_up', {
                title: 'sign up page'
            });
        });
    }
}

module.exports = UserController;
