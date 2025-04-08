document.addEventListener('DOMContentLoaded', function() {
    // Sample class data
    const classData = [
        {
            id: 'CL001',
            name: 'Grade 1A',
            grade: '1',
            section: 'A',
            teacher: 'John Smith',
            students: 25,
            status: 'Active'
        },
        {
            id: 'CL002',
            name: 'Grade 2B',
            grade: '2',
            section: 'B',
            teacher: 'Sarah Johnson',
            students: 28,
            status: 'Active'
        },
        {
            id: 'CL003',
            name: 'Grade 3C',
            grade: '3',
            section: 'C',
            teacher: 'Michael Brown',
            students: 30,
            status: 'Active'
        }
    ];

    // Function to populate class table
    function populateClassTable(data) {
        const tbody = document.getElementById('classesList');
        tbody.innerHTML = '';

        data.forEach(cls => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cls.id}</td>
                <td>${cls.name}</td>
                <td>Grade ${cls.grade}</td>
                <td>Section ${cls.section}</td>
                <td>${cls.teacher}</td>
                <td>${cls.students}</td>
                <td><span class="status ${cls.status.toLowerCase()}">${cls.status}</span></td>
                <td>
                    <button class="btn-icon btn-view" title="View Details"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon btn-edit" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon btn-delete" title="Delete"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Initial population of the table
    populateClassTable(classData);

    // Modal functionality
    const modal = document.getElementById('addClassModal');
    const addBtn = document.getElementById('addClassBtn');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.querySelector('.cancel-btn');
    const form = document.getElementById('addClassForm');

    // Open modal
    addBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        form.reset();
    }

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newClass = {
            id: 'CL' + (classData.length + 1).toString().padStart(3, '0'),
            name: document.getElementById('className').value,
            grade: document.getElementById('grade').value,
            section: document.getElementById('section').value,
            teacher: document.getElementById('classTeacher').value,
            students: 0,
            status: document.getElementById('classStatus').value
        };

        classData.push(newClass);
        populateClassTable(classData);
        closeModal();
    });

    // Filter functionality
    const gradeFilter = document.getElementById('gradeFilter');
    const searchInput = document.getElementById('searchClass');

    function applyFilters() {
        let filteredData = [...classData];

        if (gradeFilter.value) {
            filteredData = filteredData.filter(cls => cls.grade === gradeFilter.value);
        }

        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredData = filteredData.filter(cls => 
                cls.name.toLowerCase().includes(searchTerm) ||
                cls.teacher.toLowerCase().includes(searchTerm)
            );
        }

        populateClassTable(filteredData);
    }

    gradeFilter.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);

    // Action buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-view')) {
            const row = e.target.closest('tr');
            const classId = row.cells[0].textContent;
            alert(`Viewing details for class ${classId}`);
        } else if (e.target.closest('.btn-edit')) {
            const row = e.target.closest('tr');
            const classId = row.cells[0].textContent;
            alert(`Editing class ${classId}`);
        } else if (e.target.closest('.btn-delete')) {
            if (confirm('Are you sure you want to delete this class?')) {
                const row = e.target.closest('tr');
                const classId = row.cells[0].textContent;
                const index = classData.findIndex(cls => cls.id === classId);
                if (index !== -1) {
                    classData.splice(index, 1);
                    populateClassTable(classData);
                }
            }
        }
    });
}); 