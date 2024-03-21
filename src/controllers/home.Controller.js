const connection = require('../config/database');
const excelJS = require('exceljs');
const path = require('path');
const fs = require('fs').promises;
const moment = require('moment');

class HomeController {
  HomeInfo(req, res, next) {
    res.render('home', { title: "home", email: req.session.email });
  }

  download_form(req, res, next) {
    const ejsFilePath = path.join(__dirname, '..', 'views', 'download_attendance_sheet.ejs');
    res.sendFile(ejsFilePath);
  }

  download(req, res, next) {
    const { school, Date } = req.body;

    const sqlQuery = `SELECT * FROM Present WHERE school_name = ? AND attendance_date = ?`;

    // Execute the query with parameters
    connection.query(sqlQuery, [school, Date], async (error, results, fields) => {
      if (error) {
        console.error('Error fetching data from Present table:', error);
        return res.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
        });
      }

      console.log('Rows from Present table:', results);

      const workbook = new excelJS.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet('My Users'); // New Worksheet

      const downloadPath = path.join();

      try {
        // Ensure the directory exists, create it if not
        await fs.mkdir(downloadPath, { recursive: true });

        // Column for data in excel. key must match data key
        worksheet.columns = [
          { header: 'school_name', key: 'school_name', width: 10 },
          { header: '1', key: '1', width: 10 },
          { header: '2', key: '2', width: 10 },
          { header: '3', key: '3', width: 10 },
          { header: '4', key: '4', width: 10 },
          { header: '5', key: '5', width: 10 },
          { header: '6', key: '6', width: 10 },
          { header: '7', key: '7', width: 10 },
          { header: '8', key: '8', width: 10 },
          { header: '9', key: '9', width: 10 },
          { header: '10', key: '10', width: 10 },
          { header: '11', key: '11', width: 10 },
          { header: '12', key: '12', width: 10 },
          { header: 'total', key: 'total', width: 10 },
          { header: 'type', key: 'type', width: 10 },
          { header: 'Gender', key: 'gender', width: 10 },
          { header: 'Date', key: 'date', width: 10 },
        ];

        // Loop through results data
        results.forEach((result) => {
          const nextDay = moment(result.attendance_date).add(0, 'days');
          // Add the 'Date' property to the result
          result.date = nextDay.format('YYYY-MM-DD');
          // Add data to the worksheet
          worksheet.addRow(result);
        });

        // Making the first line in excel bold
        worksheet.getRow(1).eachCell((cell) => {
          cell.font = { bold: true };
        });

        const filePath = path.join(downloadPath, 'users.xlsx');
        await workbook.xlsx.writeFile(filePath);

        // Send a success response to the client
        res.status(200).json({
          status: 'success',
          message: 'File successfully created and ready for download.',
          path: filePath,  // Include the file path if needed
        });
      } catch (err) {
        console.error('Error writing or sending Excel file:', err);
        res.status(500).json({
          status: 'error',
          message: 'Something went wrong during file creation.',
        });
      }
    });
  }

}

module.exports = HomeController;

