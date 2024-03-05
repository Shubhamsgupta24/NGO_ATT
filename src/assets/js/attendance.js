// // Attach a submit event listener to the attendance form
// $('#attendance-form').submit(function (event) {
//     // Prevent the form from submitting normally
//     event.preventDefault();

//     // Get the form data
//     const formData = $(this).serialize();

//     // Send the form data using AJAX
//     $.ajax({
//         url: '/admin/attendance',
//         type: 'POST',
//         data: formData,
//         success: function (response) {
//             // Create h3 element with the total number of students and add margin-top
//             const totalStudentsH3 = $('<h3>Total Students: ' + response.rowCount + '</h3>').css('margin-top', '10px');

//             // Append the h3 tag to the attendance-sheet div
//             $('#attendance-sheet').empty().append(totalStudentsH3);

//             // Create table element
//             const table = $('<table class="table"></table>');
//             table.css('max-width', $('main').width());

//             // Create table headers
//             const headers = ['Student Name', 'School', 'Date'];
//             const headerRow = $('<tr></tr>');
//             headers.forEach(header => {
//                 headerRow.append('<th>' + header + '</th>');
//             });
//             table.append(headerRow);

//             // Create table rows for each attendance record
//             response.data.forEach(attendance => {
//                 const row = $('<tr></tr>');
//                 row.append('<td>' + attendance.studentName + '</td>');
//                 row.append('<td>' + attendance.schoolName + '</td>');
//                 row.append('<td>' + attendance.attendanceDate + '</td>');
//                 table.append(row);
//             });

//             // Append the table to the attendance-sheet div
//             $('#attendance-sheet').append(table);
//         },
//         error: function (error) {
//             console.log(error);
//         }
//     });
// });

// $('#check-attendance-link').click(function (event) {
//     // Prevent the default link behavior
//     event.preventDefault();

//     // Perform the AJAX call
//     $.ajax({
//         url: '/admin/attendance',
//         type: 'GET',  // or 'GET' depending on your server-side handling
//         data: $('#attendance-form').serialize(),
//         success: function (response) {
//             // Your success callback logic here
//             console.log(response);
//             $('main').html(response);
//         },
//         error: function (error) {
//             console.log(error);
//         }
//     });
// });

function getAttendance() {
    $.ajax({
        url: '/admin/attendance',
        type: 'GET',
        success: function (response) {
            // Clear the existing content in the main section
            $('main').empty();
            $('main').html(response);
        },
        error: function (error) {
            console.log(error);
        }
    });
}