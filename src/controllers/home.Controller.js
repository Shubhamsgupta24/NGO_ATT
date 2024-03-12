
const connection = require('../config/database');
const ExcelJS = require('exceljs');

class HomeController {
  HomeInfo(req, res, next) {
    res.render('home', { title: "home", email: req.session.email });
  }

  download(req, res, next) {
    const { school, Date } = req.body;

    const sqlQuery = `SELECT * FROM Present WHERE school = ? AND date = ?`;

    // Execute the query with parameters
    connection.query(sqlQuery, [school, Date], async (error, results, fields) => {
      if (error) {
        console.error('Error fetching data from Present table:', error);
      } else {
        console.log('Rows from Present table:', results);
        // Process the fetched rows here
        const workbook = new excelJS.Workbook();  // Create a new workbook
        const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
        const path = "./files";  // Path to download excel
        // Column for data in excel. key must match data key
        worksheet.columns = [
          { header: "school_name:", key: "school_name", width: 10 },
          { header: "1", key: "1", width: 10 },
          { header: "2", key: "2", width: 10 },
          { header: "3", key: "3", width: 10 },
          { header: "4", key: "4", width: 10 },
          { header: "5", key: "5", width: 10 },
          { header: "6", key: "6", width: 10 },
          { header: "7", key: "7", width: 10 },
          { header: "8", key: "8", width: 10 },
          { header: "9", key: "9", width: 10 },
          { header: "10", key: "10", width: 10 },
          { header: "11", key: "11", width: 10 },
          { header: "12", key: "12", width: 10 },
          { header: "total", key: "lname", width: 10 },
          { header: "Gender", key: "gender", width: 10 },
          { header: "Date", key: "date", width: 10 },
        ];
        // Looping through User data
        let counter = 1;
        User.forEach((user) => {
          user.s_no = counter;
          worksheet.addRow(user); // Add data in worksheet
          counter++;
        });
        // Making first line in excel bold
        worksheet.getRow(1).eachCell((cell) => {
          cell.font = { bold: true };
        });
        try {
          const data = await workbook.xlsx.writeFile(`${path}/users.xlsx`)
            .then(() => {
              res.send({
                status: "success",
                message: "file successfully downloaded",
                path: `${path}/users.xlsx`,
              });
            });
        } catch (err) {
          res.send({
            status: "error",
            message: "Something went wrong",
          });
        }
      }
    });
}
}
module.exports = HomeController;

