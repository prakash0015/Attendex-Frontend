document.addEventListener('DOMContentLoaded', function() {
    // Default settings
    const defaultSettings = {
        general: {
            schoolName: 'EduTrack Pro School',
            schoolAddress: '123 Education Street, Learning City',
            contactNumber: '+1 234 567 8900',
            email: 'info@edutrackpro.com'
        },
        attendance: {
            startTime: '08:00',
            endTime: '15:00',
            lateThreshold: 15,
            attendanceMode: 'manual'
        },
        notifications: {
            email: true,
            sms: false,
            parent: true,
            teacher: true
        },
        security: {
            passwordPolicy: 'medium',
            sessionTimeout: 30,
            twoFactorAuth: false,
            ipRestriction: false
        }
    };

    // Current settings (initially same as default)
    let currentSettings = JSON.parse(JSON.stringify(defaultSettings));

    // Function to load settings into form
    function loadSettings() {
        // General Settings
        document.getElementById('schoolName').value = currentSettings.general.schoolName;
        document.getElementById('schoolAddress').value = currentSettings.general.schoolAddress;
        document.getElementById('contactNumber').value = currentSettings.general.contactNumber;
        document.getElementById('email').value = currentSettings.general.email;

        // Attendance Settings
        document.getElementById('startTime').value = currentSettings.attendance.startTime;
        document.getElementById('endTime').value = currentSettings.attendance.endTime;
        document.getElementById('lateThreshold').value = currentSettings.attendance.lateThreshold;
        document.getElementById('attendanceMode').value = currentSettings.attendance.attendanceMode;

        // Notification Settings
        document.getElementById('emailNotifications').checked = currentSettings.notifications.email;
        document.getElementById('smsNotifications').checked = currentSettings.notifications.sms;
        document.getElementById('parentNotifications').checked = currentSettings.notifications.parent;
        document.getElementById('teacherNotifications').checked = currentSettings.notifications.teacher;

        // Security Settings
        document.getElementById('passwordPolicy').value = currentSettings.security.passwordPolicy;
        document.getElementById('sessionTimeout').value = currentSettings.security.sessionTimeout;
        document.getElementById('twoFactorAuth').checked = currentSettings.security.twoFactorAuth;
        document.getElementById('ipRestriction').checked = currentSettings.security.ipRestriction;
    }

    // Function to save settings from form
    function saveSettings() {
        // General Settings
        currentSettings.general.schoolName = document.getElementById('schoolName').value;
        currentSettings.general.schoolAddress = document.getElementById('schoolAddress').value;
        currentSettings.general.contactNumber = document.getElementById('contactNumber').value;
        currentSettings.general.email = document.getElementById('email').value;

        // Attendance Settings
        currentSettings.attendance.startTime = document.getElementById('startTime').value;
        currentSettings.attendance.endTime = document.getElementById('endTime').value;
        currentSettings.attendance.lateThreshold = parseInt(document.getElementById('lateThreshold').value);
        currentSettings.attendance.attendanceMode = document.getElementById('attendanceMode').value;

        // Notification Settings
        currentSettings.notifications.email = document.getElementById('emailNotifications').checked;
        currentSettings.notifications.sms = document.getElementById('smsNotifications').checked;
        currentSettings.notifications.parent = document.getElementById('parentNotifications').checked;
        currentSettings.notifications.teacher = document.getElementById('teacherNotifications').checked;

        // Security Settings
        currentSettings.security.passwordPolicy = document.getElementById('passwordPolicy').value;
        currentSettings.security.sessionTimeout = parseInt(document.getElementById('sessionTimeout').value);
        currentSettings.security.twoFactorAuth = document.getElementById('twoFactorAuth').checked;
        currentSettings.security.ipRestriction = document.getElementById('ipRestriction').checked;

        // Here you would typically save to a database or API
        console.log('Settings saved:', currentSettings);
        alert('Settings saved successfully!');
    }

    // Function to reset settings to default
    function resetSettings() {
        if (confirm('Are you sure you want to reset all settings to default?')) {
            currentSettings = JSON.parse(JSON.stringify(defaultSettings));
            loadSettings();
            alert('Settings reset to default values!');
        }
    }

    // Load initial settings
    loadSettings();

    // Event listeners for buttons
    document.querySelector('.settings-actions .primary-btn').addEventListener('click', saveSettings);
    document.querySelector('.settings-actions .secondary-btn').addEventListener('click', resetSettings);

    // Form validation
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.checkValidity()) {
                this.classList.remove('invalid');
            } else {
                this.classList.add('invalid');
            }
        });
    });

    // Real-time validation for numeric inputs
    const numericInputs = document.querySelectorAll('input[type="number"]');
    numericInputs.forEach(input => {
        input.addEventListener('input', function() {
            const min = parseInt(this.min);
            const max = parseInt(this.max);
            const value = parseInt(this.value);

            if (value < min) {
                this.value = min;
            } else if (value > max) {
                this.value = max;
            }
        });
    });

    // Time validation
    const timeInputs = document.querySelectorAll('input[type="time"]');
    timeInputs.forEach(input => {
        input.addEventListener('change', function() {
            const startTime = document.getElementById('startTime').value;
            const endTime = document.getElementById('endTime').value;

            if (startTime && endTime && startTime >= endTime) {
                alert('End time must be after start time!');
                this.value = '';
            }
        });
    });
}); 