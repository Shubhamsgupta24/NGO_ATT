const connection = require('../config/database');

class UserController {

    profile(req, res, next) {
        res.render('profile', {
            title: "profile",
            email: req.session.email
        });
    }

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
    logout(req, res, next) 
    {
        req.session.destroy((err) => {
            if (err) {
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
                req.session.email = email;
                console.log(req.session.email);
                console.log(req.session);
                console.log('User found:', results[0]);

                if (results[0].full_name === "admin") {
                    const query2 = `SELECT COUNT(*) AS total_students FROM ngo_mngt.student`;

                    connection.query(query2, (error, output, fields) => {
                        if (error) {
                            console.error(error);
                            res.status(500).send('Internal Server Error');
                            return;
                        }

                        const totalStudents = output[0].total_students;

                        const query3 = `SELECT COUNT(*) AS total_schools FROM ngo_mngt.schools`;
                        connection.query(query3, (error, answer, fields) => {
                            if (error) {
                                console.error(error);
                                res.status(500).send('Internal Server Error');
                                return;
                            }

                            const totalSchools = answer[0].total_schools;

                            console.log(`Total Students: ${totalStudents}`);
                            console.log(`Total Schools: ${totalSchools}`);

                            res.render('admin_dash', {
                                title: 'dashboard',
                                total_stud: totalStudents,
                                total_scho: totalSchools
                            });
                            return;
                        });
                    });
                } else {
                    res.render('home', {
                        title: 'Tribal Schools',
                        email:req.session.email
                    });
                    return;
                }
            } else {
                console.log('User not found or incorrect credentials');
            }
        });
    }

    create(req, res, next) {
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
