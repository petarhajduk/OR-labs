let originalData = [];
let filteredData = [];

$(document).ready(function () {
    fetchData('http://localhost:3000/api/managers');
});

function fetchData(endpoint) {
    $.ajax({
        url: endpoint,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            originalData = data;
            filteredData = data;

            displayData(data);
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });
}

function displayData(data) {
    const tableBody = document.querySelector('#managerTable tbody');

    tableBody.innerHTML = '';

    data.forEach(object => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${object.manager_id}</td>
            <td>${object.username}</td>
            <td>${object.email}</td>
            <td>${object.post_id}</td>
            <td>${object.thread_id}</td>
            <td>${object.subjectt}</td>
            <td>${object.poruka}</td>
            <td>${object.manager_vidio}</td>
            <td>${object.from_manager}</td>
            <td>${object.time_created}</td>
            <td>${object.time_manager_saw}</td>
            <td>${object.closed}</td>
        `;
        tableBody.appendChild(row);
    });
}

function applyFilter() {
    const filterColumn = $('#filterColumn').val();
    const filterValue = $('#filterValue').val();

    if (filterColumn === 'wildcard') {
        console.log('originalData', originalData)
        filteredData = originalData.filter(manager =>
            Object.values(manager).some(value =>
                value?.toString().toLowerCase().includes(filterValue.toLowerCase())
            )
        );

        displayData(filteredData);
    } else {
        filteredData = originalData.filter(manager =>
            manager[filterColumn]?.toString().toLowerCase().includes(filterValue.toLowerCase())
        );

        displayData(filteredData);
    }
}

function downloadDataAsCSV() {
    const csvContent = "data:text/csv;charset=utf-8,"
        + filteredData.map(row => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "manager_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadDataAsJSON() {
    const jsonContent = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredData));

    const link = document.createElement("a");
    link.setAttribute("href", jsonContent);
    link.setAttribute("download", "manager_data.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}