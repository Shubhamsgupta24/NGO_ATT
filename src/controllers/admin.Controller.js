const connection = require('../config/database');

class AdminController {
    attendanceInfo(req, res, next) {
        res.render('checkAttendance', {
            title: 'home'
        });
    }

    attendance(req, res, next) {
        try {
            // Access form data from the request object
            const { school, type, Date, status } = req.body;
            console.log(req.body);

            // SQL query to retrieve data from joined tables
            const query = `
              SELECT
                  s.student_name AS studentName,
                  sc.school_name AS schoolName,
                  a.type AS attendanceType,
                  a.attendance_date AS attendanceDate,
                  a.status AS attendanceStatus
              FROM
                  attendance a
              JOIN
                  student s ON a.student_ID = s.stud_id
              JOIN
                  schools sc ON s.school_id = sc.schools_id
              WHERE
                  sc.school_name = ? AND
                  a.type = ? AND
                  a.status = ? AND
                  a.attendance_date BETWEEN ? AND NOW();`;

            // Execute the query with the provided parameters
            connection
                .promise()
                .query(query, [school, type, status, Date])
                .then(([rows, fields]) => {
                    // Count the number of rows
                    const rowCount = rows.length;

                    // Render the EJS template with the retrieved data and row count
                    console.log(rows);
                    res.status(200).send({ data: rows,rowCount });
                })
                .catch((error) => {
                    console.error('Error handling attendance form submission:', error);
                    res.status(500).send('Internal Server Error');
                });
        } catch (error) {
            console.error('Error handling attendance form submission:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = AdminController;
