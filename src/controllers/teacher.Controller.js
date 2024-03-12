
const connection = require('../config/database');
const path = require('path');
  
class TeacherController {
  AttendanceInfo(req, res, next) {
    const ejsFilePath = path.join(__dirname, '..', 'views', 'teacher_form.ejs');
    res.sendFile(ejsFilePath);
  }

  Attendance(req, res, next) {
    console.log(req.body);
    const { school, year } = req.body;

    const queryParams = [school, year];
    let query = `
    SELECT
        s.student_name AS studentName,
        sc.school_name AS schoolName,
        s.stud_id,
        sc.schools_id,
        s.type,
        s.class
    FROM
        student s
    JOIN
        schools sc ON s.school_id = sc.schools_id
    WHERE
        sc.school_name = ? AND
        s.class = ?`;

    connection
      .promise()
      .query(query, queryParams)
      .then(([rows, fields]) => {
        // Render the EJS template with the retrieved data and row count
        console.log(rows);
        res.json({ data: rows });
      })
      .catch((error) => {
        console.error('Error handling attendance form submission:', error);
        res.status(500).send('Internal Server Error');
      });
  }

  Record(req, res, next) {
    const { attendanceDate, students, schools, attendanceStatus, types } = req.body;

    const cleanedAttendanceStatus = attendanceStatus.map(status => {
      if (Array.isArray(status)) {
        // Remove empty strings from nested arrays
        return status.filter(item => item !== '');
      } else {
        // Keep individual elements as they are
        return status;
      }
    }).flat();

    // Prepare the SQL query with ON DUPLICATE KEY UPDATE
    const query = `
        INSERT INTO attendance (student_id, status, type, school_ID, attendance_date)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE student_id = VALUES(student_id), status = VALUES(status),attendance_date = VALUES(attendance_date)`;

    // if two attendance taken for same date then latest info is stored

    // Execute the query for each attendance record
    attendanceStatus.forEach((status, index) => {
      const studentId = students[index];
      const schoolId = schools[index];
      const type = types[index];
      const stat = cleanedAttendanceStatus[index];

      // Execute the query with the current attendance record
      connection
        .promise()
        .query(query, [studentId, stat, type, schoolId, attendanceDate])
        .then(result => {
          // Log or handle the result as needed
          console.log(`Inserted or updated attendance record for student ${studentId} on date ${attendanceDate}`);
        })
        .catch(error => {
          // Handle the error
          console.error('Error inserting or updating attendance record:', error);
        });
    });

    // Send a response
    res.render('teacher_dash', {
      title: 'teacher_dashboard'
    });
  }

  AddStudent(req, res, next) {
    const ejsFilePath = path.join(__dirname, '..', 'views', 'add_student_form.ejs');
    res.sendFile(ejsFilePath);
  }

  RecordStudent(req, res, next) {
    console.log(req.body);
    res.send('done');
  }

  fillattendance_form(req, res, next) {
    const ejsFilePath = path.join(__dirname, '..', 'views', 'fill_attendance.ejs');
    res.sendFile(ejsFilePath);
  }

  fillattendance(req, res, next) {
    const {
      school, attendanceDate, Gender1, type1, students1, students2, students3, students4, students5, students6, students7, students8, students9,
      students10, students11, students12, Gender2, type2, students13, students14, students15, students16, students17,
      students18, students19, students20, students21, students22, students23, students24, Gender3, type3, students25,
      students26, students27, students28, students29, students30, students31, students32, students33, students34, students35,
      students36, Gender4, type4, students37, students38, students39, students40, students41, students42, students43,
      students44, students45, students46, students47, students48, Gender5, type5, students49, students50, students51, students52, students53, students54, students55, students56, students57, students58, students59, students60, Gender6, type6, students61, students62, students63, students64,
      students65, students66, students67, students68, students69, students70, students71, students72
    } = req.body;

    // Now you can use these variables as needed
    console.log(Gender1, type1, students1, students2, students3, students4, students5, students6, students7, students8, students9,
      students10, students11, students12, Gender2, type2, students13, students14, students15, students16, students17,
      students18, students19, students20, students21, students22, students23, students24, Gender3, type3, students25,
      students26, students27, students28, students29, students30, students31, students32, students33, students34, students35,
      students36, Gender4, type4, students37, students38, students39, students40, students41, students42, students43,
      students44, students45, students46, students47, students48, students49, students50, students51, students52, students53, students54, students55, students56, students57, students58, students59, students60, Gender6, type6, students61, students62, students63, students64,
      students65, students66, students67, students68, students69, students70, students71, students72);

    // Your logic here
    // Female Group 1
    connection.query(
      `INSERT INTO ngo_mngt.Present (school_name, \`1\`, \`2\`, \`3\`, \`4\`, \`5\`, \`6\`, \`7\`, \`8\`, \`9\`, \`10\`, \`11\`, \`12\`, total, type, gender, attendance_date)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        school,
        parseInt(students1, 10),
        parseInt(students2, 10),
        parseInt(students3, 10),
        parseInt(students4, 10),
        parseInt(students5, 10),
        parseInt(students6, 10),
        parseInt(students7, 10),
        parseInt(students8, 10),
        parseInt(students9, 10),
        parseInt(students10, 10),
        parseInt(students11, 10),
        parseInt(students12, 10),
        (parseInt(students1, 10) + parseInt(students2, 10) + parseInt(students3, 10) + parseInt(students4, 10) + parseInt(students5, 10) + parseInt(students6, 10) + parseInt(students7, 10) + parseInt(students8, 10) + parseInt(students9, 10) + parseInt(students10, 10) + parseInt(students11, 10) + parseInt(students12, 10)),
        type1,
        Gender1,
        attendanceDate
      ],
      (error, results) => {
        if (error) throw error;
        console.log('Inserted data for Female, आश्रमिक (students1 to students12):', results);
      }
    );

    // Female Group 2
    connection.query(
      `INSERT INTO ngo_mngt.Present (school_name, \`1\`, \`2\`, \`3\`, \`4\`, \`5\`, \`6\`, \`7\`, \`8\`, \`9\`, \`10\`, \`11\`, \`12\`, total, type, gender, attendance_date)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        school,
        parseInt(students13, 10),
        parseInt(students14, 10),
        parseInt(students15, 10),
        parseInt(students16, 10),
        parseInt(students17, 10),
        parseInt(students18, 10),
        parseInt(students19, 10),
        parseInt(students20, 10),
        parseInt(students21, 10),
        parseInt(students22, 10),
        parseInt(students23, 10),
        parseInt(students24, 10),
        (parseInt(students13, 10) + parseInt(students14, 10) + parseInt(students15, 10) + parseInt(students16, 10) + parseInt(students17, 10) + parseInt(students18, 10) + parseInt(students19, 10) + parseInt(students20, 10) + parseInt(students21, 10) + parseInt(students22, 10) + parseInt(students23, 10) + parseInt(students24, 10)),
        type2,
        Gender2,
        attendanceDate
      ],
      (error, results) => {
        if (error) throw error;
        console.log('Inserted data for Female, आश्रमिक (students13 to students24):', results);
      }
    );

    // Female Group 3
    connection.query(
      `INSERT INTO ngo_mngt.Present (school_name, \`1\`, \`2\`, \`3\`, \`4\`, \`5\`, \`6\`, \`7\`, \`8\`, \`9\`, \`10\`, \`11\`, \`12\`, total, type, gender, attendance_date)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        school,
        parseInt(students25, 10),
        parseInt(students26, 10),
        parseInt(students27, 10),
        parseInt(students28, 10),
        parseInt(students29, 10),
        parseInt(students30, 10),
        parseInt(students31, 10),
        parseInt(students32, 10),
        parseInt(students33, 10),
        parseInt(students34, 10),
        parseInt(students35, 10),
        parseInt(students36, 10),
        (parseInt(students25, 10) + parseInt(students26, 10) + parseInt(students27, 10) + parseInt(students28, 10) + parseInt(students29, 10) + parseInt(students30, 10) + parseInt(students31, 10) + parseInt(students32, 10) + parseInt(students33, 10) + parseInt(students34, 10) + parseInt(students35, 10) + parseInt(students36, 10)),
        type3,
        Gender3,
        attendanceDate
      ],
      (error, results) => {
        if (error) throw error;
        console.log('Inserted data for Female, आश्रमिक (students25 to students36):', results);
      }
    );

    // Male Group 1
    connection.query(
      `INSERT INTO ngo_mngt.Present (school_name, \`1\`, \`2\`, \`3\`, \`4\`, \`5\`, \`6\`, \`7\`, \`8\`, \`9\`, \`10\`, \`11\`, \`12\`, total, type, gender, attendance_date)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        school,
        parseInt(students37, 10),
        parseInt(students38, 10),
        parseInt(students39, 10),
        parseInt(students40, 10),
        parseInt(students41, 10),
        parseInt(students42, 10),
        parseInt(students43, 10),
        parseInt(students44, 10),
        parseInt(students45, 10),
        parseInt(students46, 10),
        parseInt(students47, 10),
        parseInt(students48, 10),
        (parseInt(students37, 10) + parseInt(students38, 10) + parseInt(students39, 10) + parseInt(students40, 10) + parseInt(students41, 10) + parseInt(students42, 10) + parseInt(students43, 10) + parseInt(students44, 10) + parseInt(students45, 10) + parseInt(students46, 10) + parseInt(students47, 10) + parseInt(students48, 10)),
        type4,
        Gender4,
        attendanceDate
      ],
      (error, results) => {
        if (error) throw error;
        console.log('Inserted data for Male, आश्रमिक (students37 to students48):', results);
      }
    );

    // Male Group 2
    connection.query(
      `INSERT INTO ngo_mngt.Present (school_name, \`1\`, \`2\`, \`3\`, \`4\`, \`5\`, \`6\`, \`7\`, \`8\`, \`9\`, \`10\`, \`11\`, \`12\`, total, type, gender, attendance_date)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        school,
        parseInt(students49, 10),
        parseInt(students50, 10),
        parseInt(students51, 10),
        parseInt(students52, 10),
        parseInt(students53, 10),
        parseInt(students54, 10),
        parseInt(students55, 10),
        parseInt(students56, 10),
        parseInt(students57, 10),
        parseInt(students58, 10),
        parseInt(students59, 10),
        parseInt(students60, 10),
        (parseInt(students49, 10) + parseInt(students50, 10) + parseInt(students51, 10) + parseInt(students52, 10) + parseInt(students53, 10) + parseInt(students54, 10) + parseInt(students55, 10) + parseInt(students56, 10) + parseInt(students57, 10) + parseInt(students58, 10) + parseInt(students59, 10) + parseInt(students60, 10)),
        type5,
        Gender5,
        attendanceDate
      ],
      (error, results) => {
        if (error) throw error;
        console.log('Inserted data for Male, आश्रमिक (students49 to students60):', results);
      }
    );

    // Male Group 3
    connection.query(
      `INSERT INTO ngo_mngt.Present (school_name, \`1\`, \`2\`, \`3\`, \`4\`, \`5\`, \`6\`, \`7\`, \`8\`, \`9\`, \`10\`, \`11\`, \`12\`, total, type, gender, attendance_date)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        school,
        parseInt(students61, 10),
        parseInt(students62, 10),
        parseInt(students63, 10),
        parseInt(students64, 10),
        parseInt(students65, 10),
        parseInt(students66, 10),
        parseInt(students67, 10),
        parseInt(students68, 10),
        parseInt(students69, 10),
        parseInt(students70, 10),
        parseInt(students71, 10),
        parseInt(students72, 10),
        (parseInt(students61, 10) + parseInt(students62, 10) + parseInt(students63, 10) + parseInt(students64, 10) + parseInt(students65, 10) + parseInt(students66, 10) + parseInt(students67, 10) + parseInt(students68, 10) + parseInt(students69, 10) + parseInt(students70, 10) + parseInt(students71, 10) + parseInt(students72, 10)),
        type6,
        Gender6,
        attendanceDate
      ],
      (error, results) => {
        if (error) throw error;
        console.log('Inserted data for Male, आश्रमिक (students61 to students72):', results);
      }
    );


    res.render('teacher_dash', {
      title: 'teacher_dashboard'
    });

  }

  seeAttendance(req, res, next) {
    const ejsFilePath = path.join(__dirname, '..', 'views', 'see_school_sheet.ejs');
    res.sendFile(ejsFilePath);
  }

  SeeAndUpdateAttendance(req, res, next) {
    const { school, Date } = req.body;
    console.log(req.body);
    const query = `
    SELECT * FROM \`ngo_mngt\`.Present
    WHERE school_name = ? AND attendance_date = ?;`;

    connection.query(query, [school, Date], (error, results, fields) => {
      if (error) {
        console.error(error);
        // Handle the error
      } else {
        // Process the results
        console.log(results)
        res.json({ data: results });
      }
    });
  }



  updateSheet(req, res, next) {
    try {
      const { schoolName, attendanceDate, gender,type,value1, value2, value3, value4, value5, value6, value7, value8, value9, value10, value11, value12 } = req.body;

      if (attendanceDate instanceof Date) {
        // Use attendanceDate directly
        var formattedDate = attendanceDate.getFullYear() + '-' + (attendanceDate.getMonth() + 1) + '-' + attendanceDate.getDate();
      } else {
        // Convert attendanceDate to a Date object
        var dateObject = new Date(attendanceDate);
        // Use dateObject for further processing
        var formattedDate = dateObject.getFullYear() + '-' + (dateObject.getMonth() + 1) + '-' + dateObject.getDate();
      }

      const sql = `
  UPDATE Present
  SET
    \`1\` = ${parseInt(value1, 10)},
    \`2\` = ${parseInt(value2, 10)},
    \`3\` = ${parseInt(value3, 10)},
    \`4\` = ${parseInt(value4, 10)},
    \`5\` = ${parseInt(value5, 10)},
    \`6\` = ${parseInt(value6, 10)},
    \`7\` = ${parseInt(value7, 10)},
    \`8\` = ${parseInt(value8, 10)},
    \`9\` = ${parseInt(value9, 10)},
    \`10\` = ${parseInt(value10, 10)},
    \`11\` = ${parseInt(value11, 10)},
    \`12\` = ${parseInt(value12, 10)},
    total = ${parseInt(value1, 10) + parseInt(value2, 10) + parseInt(value3, 10) + parseInt(value4, 10) + parseInt(value5, 10) + parseInt(value6, 10) + parseInt(value7, 10) + parseInt(value8, 10) + parseInt(value9, 10) + parseInt(value10, 10) + parseInt(value11, 10) + parseInt(value12, 10)}
  WHERE
    school_name = '${schoolName}'
    AND attendance_date = '${formattedDate}' AND type='${type}' AND gender='${gender}';
`;
      connection.query(sql, (error, results) => {
        if (error) {
          console.error('Error updating sheet:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.redirect(req.originalUrl);
        }
      });
    } catch (error) {
      console.error('Error updating sheet:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = TeacherController;
