document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('addStudentModal');
    const addStudentBtn = document.getElementById('addStudentBtn');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.querySelector('.cancel-btn');
    const addStudentForm = document.getElementById('addStudentForm');

    // Open modal when Add New Student button is clicked
    addStudentBtn.addEventListener('click', function() {
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
    addStudentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const studentData = {
            name: document.getElementById('studentName').value,
            rollNumber: document.getElementById('studentRoll').value,
            class: document.getElementById('studentClass').value,
            dob: document.getElementById('studentDOB').value,
            gender: document.getElementById('studentGender').value,
            address: document.getElementById('studentAddress').value,
            parentName: document.getElementById('parentName').value,
            parentContact: document.getElementById('parentContact').value,
            parentEmail: document.getElementById('parentEmail').value,
            joinDate: document.getElementById('studentJoinDate').value,
            status: document.getElementById('studentStatus').value
        };

        // Here you would typically send the data to your backend
        console.log('Student data to be saved:', studentData);

        // Add the new student to the table
        addStudentToTable(studentData);

        // Reset form and close modal
        addStudentForm.reset();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Function to add new student to the table
    function addStudentToTable(studentData) {
        const tbody = document.getElementById('studentsList');
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${generateStudentId()}</td>
            <td>${studentData.name}</td>
            <td>${studentData.rollNumber}</td>
            <td>${studentData.class}</td>
            <td>${studentData.parentName}</td>
            <td>${studentData.parentContact}</td>
            <td>0%</td>
            <td><span class="status ${studentData.status.toLowerCase()}">${studentData.status}</span></td>
            <td>
                <button class="btn-icon btn-view" title="View"><i class="fas fa-eye"></i></button>
                <button class="btn-icon btn-edit" title="Edit"><i class="fas fa-edit"></i></button>
                <button class="btn-icon btn-delete" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tbody.insertBefore(tr, tbody.firstChild);
    }

    // Function to generate a unique student ID
    function generateStudentId() {
        return 'S' + Math.floor(1000 + Math.random() * 9000);
    }

    // Add event listeners for action buttons
    document.getElementById('studentsList').addEventListener('click', function(event) {
        const target = event.target;
        const tr = target.closest('tr');
        
        if (target.classList.contains('btn-view')) {
            // Handle view action
            console.log('View student:', tr.cells[0].textContent);
        } else if (target.classList.contains('btn-edit')) {
            // Handle edit action
            console.log('Edit student:', tr.cells[0].textContent);
        } else if (target.classList.contains('btn-delete')) {
            // Handle delete action
            if (confirm('Are you sure you want to delete this student?')) {
                tr.remove();
            }
        }
    });
}); 