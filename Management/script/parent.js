document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('addParentModal');
    const addParentBtn = document.getElementById('addParentBtn');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.querySelector('.cancel-btn');
    const form = document.getElementById('addParentForm');

    // Open modal
    addParentBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const parentData = {
            name: document.getElementById('parentName').value,
            email: document.getElementById('parentEmail').value,
            phone: document.getElementById('parentPhone').value,
            address: document.getElementById('parentAddress').value,
            children: Array.from(document.getElementById('parentChildren').selectedOptions).map(option => option.value),
            status: document.getElementById('parentStatus').value
        };

        // Here you would typically send the data to your backend
        console.log('Parent data:', parentData);

        // Add parent to table
        addParentToTable(parentData);

        // Reset form and close modal
        form.reset();
        closeModal();
    });

    // Function to add parent to table
    function addParentToTable(parentData) {
        const tbody = document.getElementById('parentsList');
        const tr = document.createElement('tr');
        
        // Generate unique ID
        const parentId = 'P' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
        // Get children names
        const childrenNames = Array.from(document.getElementById('parentChildren').selectedOptions)
            .map(option => option.text)
            .join(', ');

        tr.innerHTML = `
            <td>${parentId}</td>
            <td>${parentData.name}</td>
            <td>${parentData.email}</td>
            <td>${parentData.phone}</td>
            <td>${childrenNames}</td>
            <td><span class="status ${parentData.status.toLowerCase()}">${parentData.status}</span></td>
            <td>
                <button class="btn-icon btn-view" title="View"><i class="fas fa-eye"></i></button>
                <button class="btn-icon btn-edit" title="Edit"><i class="fas fa-edit"></i></button>
                <button class="btn-icon btn-delete" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
        `;

        tbody.appendChild(tr);

        // Add event listeners to action buttons
        addActionButtonListeners(tr);
    }

    // Function to add event listeners to action buttons
    function addActionButtonListeners(row) {
        const viewBtn = row.querySelector('.btn-view');
        const editBtn = row.querySelector('.btn-edit');
        const deleteBtn = row.querySelector('.btn-delete');

        viewBtn.addEventListener('click', function() {
            // Handle view action
            console.log('View parent:', row.cells[0].textContent);
        });

        editBtn.addEventListener('click', function() {
            // Handle edit action
            console.log('Edit parent:', row.cells[0].textContent);
        });

        deleteBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this parent?')) {
                row.remove();
            }
        });
    }
}); 