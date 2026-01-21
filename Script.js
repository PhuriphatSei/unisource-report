// ==================== Power BI Configuration ====================
const powerBIConfig = {
    cashflow: {
        title: 'รายงานกระแสเงินสด',
        url: 'https://app.powerbi.com/reportEmbed?reportId=35cd923d-97cc-441e-a89b-5730d96da89e&autoAuth=true&ctid=be7fcd56-c7e3-4e61-9aa1-48bd8edf86d1'
    },
    project: {
        title: 'รายรับจ่ายตามโครงการ',
        url: 'https://app.powerbi.com/reportEmbed?reportId=f36b3479-0673-42e9-8faf-a6e5696c198e&autoAuth=true&ctid=be7fcd56-c7e3-4e61-9aa1-48bd8edf86d1'
    },
    maintenance: {
        title: 'รายงานซ่อมบำรุง',
        url: 'https://app.powerbi.com/reportEmbed?reportId=2753d11a-614a-465f-b399-43024e2e73d7&autoAuth=true&ctid=be7fcd56-c7e3-4e61-9aa1-48bd8edf86d1'
    },
    bidding: {
        title: 'ประมูลโครงการ',
        url: 'https://app.powerbi.com/reportEmbed?reportId=2152a8d3-d746-48a0-b0cb-3be012d197ea&autoAuth=true&ctid=be7fcd56-c7e3-4e61-9aa1-48bd8edf86d1' 
    },
    guarantee: {
        title: 'เงินค้ำประกัน',
        url: 'https://app.powerbi.com/reportEmbed?reportId=7637e1e3-51b4-4f7c-9b3f-fb641ff5cdce&autoAuth=true&ctid=be7fcd56-c7e3-4e61-9aa1-48bd8edf86d1'
    }
};

// ==================== DOM Elements ====================
const menuCards = document.querySelectorAll('.menu-card');
const menuContainer = document.getElementById('menuContainer');
const powerbiContainer = document.getElementById('powerbiContainer');
const powerbiFrame = document.getElementById('powerbiFrame');
const reportTitle = document.getElementById('reportTitle');
const closeBtn = document.getElementById('closeBtn');

// ==================== Event Listeners ====================

// Menu card click event
menuCards.forEach(card => {
    card.addEventListener('click', function(e) {
        console.log('Card clicked:', this.dataset.report);
        
        const reportType = this.dataset.report;
        const config = powerBIConfig[reportType];

        if (!config) {
            console.error('Config not found for:', reportType);
            return;
        }

        console.log('Loading report:', config.title);

        // Update active state
        menuCards.forEach(c => c.classList.remove('active'));
        this.classList.add('active');

        // Update report title
        reportTitle.textContent = config.title;

        // Show Power BI container
        showPowerBIContainer();

        // Load Power BI report
        loadPowerBIReport(config.url);

        // Smooth scroll to top
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    });

    // Add hover sound effect (optional - can be enabled if needed)
    card.addEventListener('mouseenter', function() {
        console.log('Card hover:', this.dataset.report);
        // playHoverSound(); // Uncomment if you want sound effects
    });
});

// Close button event
closeBtn.addEventListener('click', closePowerBIContainer);

// Keyboard shortcut - ESC to close
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && powerbiContainer.classList.contains('active')) {
        closePowerBIContainer();
    }
});

// ==================== Functions ====================

/**
 * Show Power BI container and hide menu
 */
function showPowerBIContainer() {
    menuContainer.style.display = 'none';
    powerbiContainer.classList.add('active');
}

/**
 * Close Power BI container and show menu
 */
function closePowerBIContainer() {
    powerbiContainer.classList.remove('active');
    menuContainer.style.display = 'grid';
    
    // Clear active state from menu cards
    menuCards.forEach(c => c.classList.remove('active'));
    
    // Clear iframe content
    clearPowerBIFrame();

    // Smooth scroll to top
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
}

/**
 * Load Power BI report in iframe
 * @param {string} url - Power BI embed URL
 */
function loadPowerBIReport(url) {
    if (url && isValidURL(url)) {
        // Show loading state
        showLoadingState();

        // Create iframe
        setTimeout(() => {
            powerbiFrame.innerHTML = `
                <iframe 
                    src="${url}" 
                    frameborder="0" 
                    allowFullScreen="true"
                    style="width: 100%; height: 100%; border: none; border-radius: 12px;"
                    title="Power BI Report">
                </iframe>
            `;
        }, 300);
    } else {
        // Show placeholder if URL is not configured
        showPlaceholder();
    }
}

/**
 * Show loading state
 */
function showLoadingState() {
    powerbiFrame.innerHTML = `
        <div class="placeholder">
            <div class="placeholder-icon">⏳</div>
            <h3>กำลังโหลดรายงาน...</h3>
            <p>กรุณารอสักครู่</p>
            <div class="loading"></div>
        </div>
    `;
}

/**
 * Show placeholder when URL is not configured
 */
function showPlaceholder() {
    powerbiFrame.innerHTML = `
        <div class="placeholder">
            <div class="placeholder-icon">⚠️</div>
            <h3>ยังไม่ได้กำหนด URL</h3>
            <p>กรุณาแก้ไขไฟล์ script.js และใส่ Power BI Embed URL<br>
            ในตัวแปร <code style="background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 4px;">powerBIConfig</code></p>
            <div class="loading"></div>
        </div>
    `;
}

/**
 * Clear Power BI iframe
 */
function clearPowerBIFrame() {
    powerbiFrame.innerHTML = `
        <div class="placeholder">
            <div class="placeholder-icon">📈</div>
            <h3>เชื่อมต่อ Power BI</h3>
            <p>กรุณาใส่ Power BI Embed URL ของคุณในโค้ด JavaScript</p>
        </div>
    `;
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid URL
 */
function isValidURL(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch (e) {
        return false;
    }
}

/**
 * Optional: Play hover sound effect
 * Uncomment if you want to add sound effects
 */
// function playHoverSound() {
//     const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi2Bzvrbhzj+///+');
//     audio.volume = 0.2;
//     audio.play().catch(e => console.log('Audio play failed:', e));
// }

// ==================== Initialize ====================

/**
 * Initialize the application
 */
function init() {
    console.log('🚀 ระบบรายงานทางการเงิน - เริ่มต้นแล้ว');
    console.log('📊 Power BI Reports:', Object.keys(powerBIConfig));
    
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const username = sessionStorage.getItem('username');
    const userRole = sessionStorage.getItem('userRole');
    
    if (!isLoggedIn || isLoggedIn !== 'true') {
        console.log('⚠️ User not logged in, redirecting to login page...');
        window.location.href = 'index.html';
        return;
    }
    
    console.log(`👤 Welcome ${username} (Role: ${userRole})`);
    
    // Check if all required elements exist
    if (!menuContainer || !powerbiContainer || !powerbiFrame) {
        console.error('❌ ไม่พบ DOM elements ที่จำเป็น');
        console.error('menuContainer:', menuContainer);
        console.error('powerbiContainer:', powerbiContainer);
        console.error('powerbiFrame:', powerbiFrame);
        return;
    }

    console.log('✅ พบ DOM elements ทั้งหมด');
    console.log('✅ พบ menu cards:', menuCards.length, 'cards');

    // Apply user permissions
    applyUserPermissions(userRole);
    
    // Display user info in header
    displayUserInfo();
    
    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
        console.log('✅ Logout button ready');
    }

    // Test click functionality
    menuCards.forEach((card, index) => {
        console.log(`Card ${index + 1}:`, card.dataset.report);
    });

    // Set initial state
    clearPowerBIFrame();
    
    console.log('✅ พร้อมใช้งาน - ลองคลิกที่การ์ดเมนู');
}

/**
 * Apply User Permissions - ซ่อน/แสดงเมนูตามสิทธิ์
 */
function applyUserPermissions(role) {
    console.log(`🔐 Applying permissions for role: ${role}`);
    
    const cashflowCard = document.querySelector('[data-report="cashflow"]');
    
    if (role === 'user') {
        // ซ่อนเมนูกระแสเงินสดสำหรับ user
        if (cashflowCard) {
            cashflowCard.style.display = 'none';
            console.log('🚫 Hidden: รายงานกระแสเงินสด (user role)');
        }
    } else if (role === 'admin') {
        // admin เห็นทุกเมนู
        if (cashflowCard) {
            cashflowCard.style.display = 'block';
            console.log('✅ Visible: รายงานกระแสเงินสด (admin role)');
        }
    }
}

/**
 * Display User Info in Header
 */
function displayUserInfo() {
    const username = sessionStorage.getItem('username');
    const userRole = sessionStorage.getItem('userRole');
    const userNameElement = document.getElementById('userName');
    
    if (userNameElement && username) {
        const roleText = userRole === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้';
        userNameElement.textContent = `${username} (${roleText})`;
    }
}

/**
 * Handle Logout
 */
function handleLogout() {
    console.log('🚪 Logging out...');
    
    // Confirm before logout
    const confirmLogout = confirm('ต้องการออกจากระบบหรือไม่?');
    
    if (confirmLogout) {
        // Clear session
        sessionStorage.clear();
        
        // Redirect to login page
        window.location.href = 'index.html';
    }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ==================== Utility Functions ====================

/**
 * Debug function to test Power BI URL
 * Call from browser console: testPowerBIURL('report-type')
 */
window.testPowerBIURL = function(reportType) {
    const config = powerBIConfig[reportType];
    if (config) {
        console.log(`Testing ${reportType}:`, config);
        if (config.url) {
            console.log('✅ URL is configured');
            window.open(config.url, '_blank');
        } else {
            console.log('❌ URL is not configured');
        }
    } else {
        console.log('❌ Report type not found');
    }
};

/**
 * Add smooth scroll behavior to all internal links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});