// Disguise My App Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeDownloadButton();
});

// Header scroll effect
function initializeHeader() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.8)';
            header.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .step, .feature-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Download button functionality
function initializeDownloadButton() {
    const downloadBtn = document.getElementById('download-btn');
    
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add a loading state
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<span class="download-icon">⏳</span> Preparing Purchase...';
        downloadBtn.style.pointerEvents = 'none';
        
        // Simulate download preparation (replace with actual download logic)
        setTimeout(() => {
            // Reset button state
            downloadBtn.innerHTML = originalText;
            downloadBtn.style.pointerEvents = 'auto';
            
            // Show purchase message
            showPurchaseMessage();
        }, 2000);
    });
}

// Show purchase message
function showPurchaseMessage() {
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'purchase-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">🛍️</span>
            <div class="notification-text">
                <strong>Coming Soon!</strong>
                <p>Disguise My App will be available for $5 as a one-time purchase. Get notified when it launches!</p>
            </div>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .purchase-notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 40px rgba(0, 0, 0, 0.16);
            border: 1px solid #D2D2D7;
            padding: 20px;
            max-width: 400px;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        }
        
        .notification-content {
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }
        
        .notification-icon {
            font-size: 24px;
            flex-shrink: 0;
        }
        
        .notification-text strong {
            display: block;
            margin-bottom: 4px;
            color: #1D1D1F;
        }
        
        .notification-text p {
            color: #6E6E73;
            font-size: 14px;
            margin: 0;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #8E8E93;
            padding: 0;
            margin-left: auto;
            flex-shrink: 0;
        }
        
        .notification-close:hover {
            color: #1D1D1F;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
            document.head.removeChild(style);
        }, 300);
    });
    
    // Auto-close after 8 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            closeBtn.click();
        }
    }, 8000);
}

// Add some interactive hover effects to demo icons
document.addEventListener('DOMContentLoaded', () => {
    const demoIcons = document.querySelectorAll('.app-grid .app-icon');
    
    demoIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Add typing animation to hero title
function initializeTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--primary-color)';
    
    let i = 0;
    const typingSpeed = 100;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
}

// Uncomment to enable typing animation
// initializeTypingAnimation();
