document.addEventListener('DOMContentLoaded', function() {
    // Initialize the attendance chart
    const ctx = document.getElementById('attendanceChart').getContext('2d');
    const attendanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Attendance Rate',
                data: [92, 95, 94, 96, 93, 90, 95],
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
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });

    // Handle attendance filter change
    document.getElementById('attendanceFilter').addEventListener('change', function(e) {
        const period = e.target.value;
        // Here you would typically fetch new data based on the selected period
        // For now, we'll just update the chart with some sample data
        let newData;
        if (period === 'week') {
            newData = [92, 95, 94, 96, 93, 90, 95];
        } else if (period === 'month') {
            newData = [92, 94, 93, 95, 94, 93, 92, 94, 95, 96, 94, 93, 92, 94, 95, 96, 94, 93, 92, 94, 95, 96, 94, 93, 92, 94, 95, 96, 94, 93];
        } else if (period === 'year') {
            newData = [92, 93, 94, 95, 94, 93, 92, 94, 95, 96, 94, 93];
        }
        attendanceChart.data.datasets[0].data = newData;
        attendanceChart.update();
    });

    // Update real-time data (simulated)
    setInterval(() => {
        // Simulate real-time updates
        const currentData = attendanceChart.data.datasets[0].data;
        const newValue = Math.floor(Math.random() * (98 - 90 + 1)) + 90;
        currentData.shift();
        currentData.push(newValue);
        attendanceChart.update();
    }, 5000);
}); 