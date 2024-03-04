function getSchoolInfo() {
    $.ajax({
        url: '/schools/getinfo',
        type: 'GET',
        success: function (response) {
            // Clear the existing content in the main section
            $('main').empty();

            // Create a table element
            const table = $('<table class="table"></table>');

            // Create table headers
            const headers = ['ID', 'School Name', 'Boys', 'Girls', 'Total'];
            const headerRow = $('<tr></tr>');
            headers.forEach(header => {
                headerRow.append('<th>' + header + '</th>');
            });
            table.append(headerRow);

            // Create table rows for each school
            response.data.forEach(school => {
                const row = $('<tr></tr>');
                row.append('<td>' + school.schools_id + '</td>');
                row.append('<td>' + school.school_name + '</td>');
                row.append('<td>' + school.boys + '</td>');
                row.append('<td>' + school.girls + '</td>');
                row.append('<td>' + school.total + '</td>');
                table.append(row);
            });

            // Append the table to the main section
            $('main').append(table);
        },
        error: function (error) {
            console.log(error);
        }
    });
}