document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('addTeacherModal');
    const addTeacherBtn = document.getElementById('addTeacherBtn');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.querySelector('.cancel-btn');
    const addTeacherForm = document.getElementById('addTeacherForm');

    // Open modal when Add New Teacher button is clicked
    addTeacherBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });

    // Close modal when close button is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when cancel button is clicked
    cancelBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside the modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle form submission
    addTeacherForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const teacherData = {
            name: document.getElementById('teacherName').value,
            email: document.getElementById('teacherEmail').value,
            phone: document.getElementById('teacherPhone').value,
            address: document.getElementById('teacherAddress').value,
            classes: Array.from(document.getElementById('teacherClasses').selectedOptions).map(option => option.value),
            subjects: Array.from(document.getElementById('teacherSubjects').selectedOptions).map(option => option.value),
            status: document.getElementById('teacherStatus').value,
            joinDate: document.getElementById('teacherJoinDate').value
        };

        // Here you would typically send the data to your backend
        console.log('Teacher data to be saved:', teacherData);

        // Add the new teacher to the table
        addTeacherToTable(teacherData);

        // Reset form and close modal
        addTeacherForm.reset();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Function to add new teacher to the table
    function addTeacherToTable(teacherData) {
        const tbody = document.getElementById('teachersList');
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${generateTeacherId()}</td>
            <td>${teacherData.name}</td>
            <td>${teacherData.email}</td>
            <td>${teacherData.phone}</td>
            <td>${teacherData.classes.join(', ')}</td>
            <td>${teacherData.subjects.join(', ')}</td>
            <td><span class="status ${teacherData.status.toLowerCase()}">${teacherData.status}</span></td>
            <td>
                <button class="btn-icon btn-view" title="View"><i class="fas fa-eye"></i></button>
                <button class="btn-icon btn-edit" title="Edit"><i class="fas fa-edit"></i></button>
                <button class="btn-icon btn-delete" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tbody.insertBefore(tr, tbody.firstChild);
    }

    // Function to generate a unique teacher ID
    function generateTeacherId() {
        return 'T' + Math.floor(1000 + Math.random() * 9000);
    }

    // Add event listeners for action buttons
    document.getElementById('teachersList').addEventListener('click', function(event) {
        const target = event.target;
        const tr = target.closest('tr');
        
        if (target.classList.contains('btn-view')) {
            // Handle view action
            console.log('View teacher:', tr.cells[0].textContent);
        } else if (target.classList.contains('btn-edit')) {
            // Handle edit action
            console.log('Edit teacher:', tr.cells[0].textContent);
        } else if (target.classList.contains('btn-delete')) {
            // Handle delete action
            if (confirm('Are you sure you want to delete this teacher?')) {
                tr.remove();
            }
        }
    });
}); 