

const connection = require('../config/database');

class SchoolController {
    getinfo(req, res, next) {
        // SQL query to select all records from the school table
        const query = 'SELECT * FROM schools';

        // Execute the query
        connection.query(query, (error, results, fields) => {
            if (error) {
                // Handle the error
                console.error('Error fetching data from the database:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Send the retrieved data as a JSON response
            res.json({ data: results });
        });
    }
}

module.exports = SchoolController;
