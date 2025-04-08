document.addEventListener('DOMContentLoaded', function() {
    // Create a container for the sidebar
    const container = document.querySelector('.container');
    if (!container) return;

    // Create sidebar HTML
    const sidebarHTML = `
        <button class="hamburger-menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <div class="sidebar">
            <div class="logo">
                <h2>Management Panel</h2>
            </div>
            <div class="menu">
                <h3>MAIN</h3>
                <ul>
                    <li><a href="ManageDash.html">Dashboard</a></li>
                </ul>
                
                <h3>ATTENDANCE</h3>
                <ul>
                    <li><a href="view-attendance.html">View Attendance</a></li>
                    <li><a href="reports.html">Reports</a></li>
                </ul>
                
                <h3>USER MANAGEMENT</h3>
                <ul>
                    <li><a href="teacherManage.html">Teachers</a></li>
                    <li><a href="StudentManage.html">Students</a></li>
                    <li><a href="ParentsManage.html">Parents</a></li>
                </ul>
                
                <h3>SETTINGS</h3>
                <ul>
                    <li><a href="classes.html">Classes</a></li>
                    <li><a href="system-settings.html">System Settings</a></li>
                </ul>
            </div>
        </div>
        <div class="sidebar-overlay" id="sidebarOverlay"></div>
    `;

    // Insert the sidebar at the beginning of the container
    container.insertAdjacentHTML('afterbegin', sidebarHTML);

    // Mark the current page as active in the sidebar
    const currentPage = window.location.pathname.split('/').pop();
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}); 