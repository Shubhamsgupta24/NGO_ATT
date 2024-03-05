const connection = require('../config/database');
const path = require('path');

class AdminController {

    attendanceInfo(req, res, next) {
        const ejsFilePath = path.join(__dirname, '..', 'views', 'checkAttendance.ejs');
        res.sendFile(ejsFilePath);
    }

    attendance(req, res, next) 
    {
        try {
            // Access form data from the request object
            const { school, type, Date, status } = req.body;
            console.log(req.body);
    
            // SQL query to retrieve data from joined tables
            let query = `
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
                  a.attendance_date BETWEEN ? AND NOW()`;
    
            // Dynamically add the status filter only if it is not 'None'
            const queryParams = [school, type, Date];
            if (type !== 'None' && type !== null) {
                query += ' AND a.type = ?';
                queryParams.push(type);
            }
            
            if (status && status !== 'None') {
                query += ' AND a.status = ?';
                queryParams.push(status);
            }
    
            // Execute the query with the provided parameters
            connection
                .promise()
                .query(query, queryParams)
                .then(([rows, fields]) => {
                    // Count the number of rows
                    const rowCount = rows.length;
    
                    // Render the EJS template with the retrieved data and row count
                    console.log(rows);
                    res.json({ data: rows, rowCount });
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
