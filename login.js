// ==================== Login Configuration ====================
const LOGIN_CONFIG = {
    users: [
        { username: 'admin', password: 'unisource01', role: 'admin' },
        { username: 'user', password: 'user123', role: 'user' },
        { username: 'dev', password: 'allforone', role: 'admin' }
    ],
    dashboardUrl: 'dashboard.html',
    rememberDays: 7
};

// ==================== DOM Elements ====================
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const rememberMeCheckbox = document.getElementById('rememberMe');
const errorMessage = document.getElementById('errorMessage');
const loginBtn = document.getElementById('loginBtn');
const microsoftBtn = document.getElementById('microsoftBtn');
const forgotPasswordLink = document.getElementById('forgotPassword');

// ==================== Event Listeners ====================

// Form Submit
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleLogin();
});

// Toggle Password Visibility
togglePasswordBtn.addEventListener('click', function() {
    togglePasswordVisibility();
});

// Microsoft Login
microsoftBtn.addEventListener('click', function() {
    handleMicrosoftLogin();
});

// Forgot Password
forgotPasswordLink.addEventListener('click', function(e) {
    e.preventDefault();
    handleForgotPassword();
});

// Enter key on password field
passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleLogin();
    }
});

// ==================== Functions ====================

/**
 * Handle Login
 */
function handleLogin() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    console.log('Attempting login for:', username);

    // Validate inputs
    if (!username || !password) {
        showError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
        return;
    }

    // Show loading state
    showLoadingState();

    // Simulate API call (remove setTimeout in production)
    setTimeout(() => {
        // Check credentials
        const user = LOGIN_CONFIG.users.find(
            u => u.username === username && u.password === password
        );

        if (user) {
            console.log('Login successful!');
            handleSuccessfulLogin(username);
        } else {
            console.log('Login failed - Invalid credentials');
            hideLoadingState();
            showError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            shakeForm();
        }
    }, 1000);
}

/**
 * Handle Successful Login
 */
function handleSuccessfulLogin(username) {
    // Get user info
    const user = LOGIN_CONFIG.users.find(u => u.username === username);
    
    // Save to localStorage if remember me is checked
    if (rememberMeCheckbox.checked) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + LOGIN_CONFIG.rememberDays);
        
        localStorage.setItem('rememberedUser', username);
        localStorage.setItem('rememberExpiry', expiryDate.toISOString());
    }

    // Save session with role
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('userRole', user.role); // บันทึก role
    sessionStorage.setItem('loginTime', new Date().toISOString());

    // Show success message
    showSuccessAnimation();

    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = LOGIN_CONFIG.dashboardUrl;
    }, 1500);
}

/**
 * Toggle Password Visibility
 */
function togglePasswordVisibility() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    // Change eye icon
    const eyeIcon = togglePasswordBtn.querySelector('.eye-icon');
    eyeIcon.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
}

/**
 * Handle Microsoft Login
 */
function handleMicrosoftLogin() {
    console.log('Microsoft login clicked');
    
    // Show loading
    microsoftBtn.innerHTML = '<span class="microsoft-icon">⏳</span><span>กำลังเชื่อมต่อ...</span>';
    microsoftBtn.disabled = true;

    // Simulate Microsoft OAuth (replace with real OAuth in production)
    setTimeout(() => {
        alert('ฟีเจอร์ Microsoft Login จะพร้อมใช้งานเร็วๆ นี้\n\nในการใช้งานจริง ควรเชื่อมต่อกับ Microsoft Azure AD');
        microsoftBtn.innerHTML = '<span class="microsoft-icon">🏢</span><span>เข้าสู่ระบบด้วย Microsoft</span>';
        microsoftBtn.disabled = false;
    }, 1500);
}

/**
 * Handle Forgot Password
 */
function handleForgotPassword() {
    const email = prompt('กรุณากรอกอีเมลของคุณ:');
    
    if (email) {
        if (validateEmail(email)) {
            alert(`ส่งลิงก์รีเซ็ตรหัสผ่านไปยัง ${email} เรียบร้อยแล้ว\n\nกรุณาตรวจสอบอีเมลของคุณ`);
        } else {
            alert('รูปแบบอีเมลไม่ถูกต้อง');
        }
    }
}

/**
 * Show Error Message
 */
function showError(message) {
    errorMessage.querySelector('.error-text').textContent = message;
    errorMessage.style.display = 'flex';
    
    // Hide after 5 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

/**
 * Show Loading State
 */
function showLoadingState() {
    loginBtn.innerHTML = '<span class="btn-text">กำลังเข้าสู่ระบบ...</span><span class="btn-icon">⏳</span>';
    loginBtn.disabled = true;
}

/**
 * Hide Loading State
 */
function hideLoadingState() {
    loginBtn.innerHTML = '<span class="btn-text">เข้าสู่ระบบ</span><span class="btn-icon">→</span>';
    loginBtn.disabled = false;
}

/**
 * Show Success Animation
 */
function showSuccessAnimation() {
    loginBtn.innerHTML = '<span class="btn-text">เข้าสู่ระบบสำเร็จ!</span><span class="btn-icon">✓</span>';
    loginBtn.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';
}

/**
 * Shake Form Animation
 */
function shakeForm() {
    loginForm.style.animation = 'none';
    setTimeout(() => {
        loginForm.style.animation = 'shake 0.4s ease-in-out';
    }, 10);
}

/**
 * Validate Email
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Check if user is already logged in
 */
function checkExistingSession() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const rememberedUser = localStorage.getItem('rememberedUser');
    const rememberExpiry = localStorage.getItem('rememberExpiry');

    // Check session
    if (isLoggedIn === 'true') {
        console.log('Active session found, redirecting...');
        window.location.href = LOGIN_CONFIG.dashboardUrl;
        return;
    }

    // Check remember me
    if (rememberedUser && rememberExpiry) {
        const expiryDate = new Date(rememberExpiry);
        const now = new Date();

        if (now < expiryDate) {
            console.log('Remembered user found:', rememberedUser);
            usernameInput.value = rememberedUser;
            rememberMeCheckbox.checked = true;
        } else {
            // Expired
            localStorage.removeItem('rememberedUser');
            localStorage.removeItem('rememberExpiry');
        }
    }
}

/**
 * Auto focus on username input
 */
function focusUsername() {
    if (!usernameInput.value) {
        usernameInput.focus();
    } else {
        passwordInput.focus();
    }
}

// ==================== Initialize ====================
function init() {
    console.log('🔐 Login Page Initialized');
    console.log('Available test accounts:', LOGIN_CONFIG.users.map(u => u.username));
    
    // Check existing session
    checkExistingSession();
    
    // Auto focus
    setTimeout(focusUsername, 300);
    
    console.log('✅ Ready to login');
}

// Run initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ==================== Utility Functions ====================

/**
 * Debug function - Add user
 * Call from console: addTestUser('newuser', 'password123')
 */
window.addTestUser = function(username, password) {
    LOGIN_CONFIG.users.push({ username, password });
    console.log('Test user added:', username);
    console.log('All users:', LOGIN_CONFIG.users);
};

/**
 * Debug function - Show all users
 */
window.showUsers = function() {
    console.log('Available users:');
    LOGIN_CONFIG.users.forEach(user => {
        console.log(`Username: ${user.username}, Password: ${user.password}`);
    });
};

/**
 * Clear all saved data
 */
window.clearLoginData = function() {
    localStorage.clear();
    sessionStorage.clear();
    console.log('All login data cleared');
};