document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initializeCharts();

    // Sample report data
    const reportData = [
        {
            date: '2024-03-15',
            class: '5A',
            totalStudents: 40,
            present: 35,
            absent: 3,
            late: 2,
            attendancePercent: 87.5
        },
        {
            date: '2024-03-14',
            class: '5A',
            totalStudents: 40,
            present: 38,
            absent: 1,
            late: 1,
            attendancePercent: 95
        },
        {
            date: '2024-03-13',
            class: '5A',
            totalStudents: 40,
            present: 36,
            absent: 2,
            late: 2,
            attendancePercent: 90
        }
    ];

    // Function to populate report table
    function populateReportTable(data) {
        const tbody = document.getElementById('reportList');
        tbody.innerHTML = '';

        data.forEach(record => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${record.date}</td>
                <td>${record.class}</td>
                <td>${record.totalStudents}</td>
                <td>${record.present}</td>
                <td>${record.absent}</td>
                <td>${record.late}</td>
                <td>${record.attendancePercent}%</td>
                <td>
                    <button class="btn-icon btn-view" title="View Details"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon btn-download" title="Download"><i class="fas fa-download"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Initial population of the table
    populateReportTable(reportData);

    // Function to initialize charts
    function initializeCharts() {
        // Attendance Trend Chart
        const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
        new Chart(attendanceCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                datasets: [{
                    label: 'Attendance %',
                    data: [92, 88, 95, 90, 94, 85],
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 80,
                        max: 100
                    }
                }
            }
        });

        // Class-wise Attendance Chart
        const classCtx = document.getElementById('classChart').getContext('2d');
        new Chart(classCtx, {
            type: 'bar',
            data: {
                labels: ['5A', '5B', '6A', '6B', '7A', '7B'],
                datasets: [{
                    label: 'Attendance %',
                    data: [95, 88, 92, 85, 90, 87],
                    backgroundColor: [
                        'rgba(76, 175, 80, 0.8)',
                        'rgba(33, 150, 243, 0.8)',
                        'rgba(255, 152, 0, 0.8)',
                        'rgba(156, 39, 176, 0.8)',
                        'rgba(233, 30, 99, 0.8)',
                        'rgba(0, 188, 212, 0.8)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 80,
                        max: 100
                    }
                }
            }
        });
    }

    // Filter functionality
    const reportType = document.getElementById('reportType');
    const timePeriod = document.getElementById('timePeriod');
    const chartFilter = document.getElementById('chartFilter');

    function applyFilters() {
        // Here you would typically fetch new data based on filters
        console.log('Generating report:', {
            type: reportType.value,
            period: timePeriod.value
        });
    }

    reportType.addEventListener('change', applyFilters);
    timePeriod.addEventListener('change', applyFilters);
    chartFilter.addEventListener('change', function() {
        // Here you would update the chart data based on the selected period
        console.log('Updating chart for period:', chartFilter.value);
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredData = reportData.filter(record => 
            record.class.toLowerCase().includes(searchTerm) ||
            record.date.includes(searchTerm)
        );
        populateReportTable(filteredData);
    });

    // Add event listeners to action buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-view')) {
            const row = e.target.closest('tr');
            const date = row.cells[0].textContent;
            const className = row.cells[1].textContent;
            alert(`Viewing detailed report for ${className} on ${date}`);
        } else if (e.target.closest('.btn-download')) {
            const row = e.target.closest('tr');
            const date = row.cells[0].textContent;
            const className = row.cells[1].textContent;
            alert(`Downloading report for ${className} on ${date}`);
        }
    });
}); 