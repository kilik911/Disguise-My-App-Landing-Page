// Disguise My App Landing Page JavaScript

document.addEventListener("DOMContentLoaded", function() {
    // Load Header
    fetch('/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        });

    // Load Footer
    fetch('/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});

document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
    initializeSmoothScrolling();
    initializeAnimations();
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

document.addEventListener('DOMContentLoaded', () => {
    const shareButton = document.getElementById('share-button');
    const sharePopup = document.getElementById('share-popup');
    const copyLinkButton = document.getElementById('copy-link-button');

    if (shareButton && sharePopup) {
        shareButton.addEventListener('click', (event) => {
            event.stopPropagation();
            sharePopup.classList.toggle('show');
        });

        document.addEventListener('click', (event) => {
            if (!sharePopup.contains(event.target) && !shareButton.contains(event.target)) {
                sharePopup.classList.remove('show');
            }
        });
    }

    if (copyLinkButton) {
        copyLinkButton.addEventListener('click', () => {
            const url = 'https://disguisemyapp.com/';
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard!');
                sharePopup.classList.remove('show');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }
});