document.addEventListener('DOMContentLoaded', function() {
    // Sample attendance data
    const attendanceData = [
        {
            date: '2024-03-15',
            class: '5A',
            studentName: 'Rahul Sharma',
            rollNo: '101',
            status: 'Present',
            inTime: '08:30 AM',
            outTime: '03:30 PM',
            notes: '-'
        },
        {
            date: '2024-03-15',
            class: '5A',
            studentName: 'Priya Patel',
            rollNo: '102',
            status: 'Absent',
            inTime: '-',
            outTime: '-',
            notes: 'Sick leave'
        },
        {
            date: '2024-03-15',
            class: '5A',
            studentName: 'Aarav Gupta',
            rollNo: '103',
            status: 'Late',
            inTime: '09:15 AM',
            outTime: '03:30 PM',
            notes: 'Bus delay'
        }
    ];

    // Function to populate attendance table
    function populateAttendanceTable(data) {
        const tbody = document.getElementById('attendanceList');
        tbody.innerHTML = '';

        data.forEach(record => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${record.date}</td>
                <td>${record.class}</td>
                <td>${record.studentName}</td>
                <td>${record.rollNo}</td>
                <td><span class="status ${record.status.toLowerCase()}">${record.status}</span></td>
                <td>${record.inTime}</td>
                <td>${record.outTime}</td>
                <td>${record.notes}</td>
                <td>
                    <button class="btn-icon btn-view" title="View Details"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon btn-edit" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon btn-print" title="Print"><i class="fas fa-print"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Initial population of the table
    populateAttendanceTable(attendanceData);

    // Filter functionality
    const classFilter = document.getElementById('classFilter');
    const dateFilter = document.getElementById('dateFilter');
    const statusFilter = document.getElementById('statusFilter');

    function applyFilters() {
        let filteredData = [...attendanceData];

        if (classFilter.value) {
            filteredData = filteredData.filter(record => record.class === classFilter.value);
        }

        if (dateFilter.value) {
            filteredData = filteredData.filter(record => record.date === dateFilter.value);
        }

        if (statusFilter.value) {
            filteredData = filteredData.filter(record => record.status === statusFilter.value);
        }

        populateAttendanceTable(filteredData);
    }

    classFilter.addEventListener('change', applyFilters);
    dateFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredData = attendanceData.filter(record => 
            record.studentName.toLowerCase().includes(searchTerm) ||
            record.rollNo.toLowerCase().includes(searchTerm)
        );
        populateAttendanceTable(filteredData);
    });

    // Add event listeners to action buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-view')) {
            const row = e.target.closest('tr');
            const studentName = row.cells[2].textContent;
            alert(`Viewing details for ${studentName}`);
        } else if (e.target.closest('.btn-edit')) {
            const row = e.target.closest('tr');
            const studentName = row.cells[2].textContent;
            alert(`Editing attendance for ${studentName}`);
        } else if (e.target.closest('.btn-print')) {
            const row = e.target.closest('tr');
            const studentName = row.cells[2].textContent;
            alert(`Printing attendance for ${studentName}`);
        }
    });
}); 