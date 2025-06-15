// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    setupSmoothScrolling();
    setupContactForm();
    setupScrollEffects();
    setupProjectAnimations();
    setupMobileMenu();
    setupTypingEffect();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form handling with validation
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name').trim(),
                email: formData.get('email').trim(),
                message: formData.get('message').trim()
            };
            
            // Validate form data
            if (!validateForm(data)) {
                return;
            }
            
            // Add loading state
            const submitBtn = this.querySelector('.send-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual backend API)
            setTimeout(() => {
                console.log('Form submitted:', data);
                
                // Show success message
                if (successMessage) {
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    if (successMessage) {
                        successMessage.style.display = 'none';
                    }
                }, 5000);
            }, 1000);
        });
    }
}

// Form validation
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.message || data.message.length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
        alert('Please fix the following errors:\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Header background and scroll effects
function setupScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const header = document.querySelector('header');
        const scrollY = window.scrollY;
        
        // Header background change
        if (scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.1)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero && scrollY < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Project cards animation on scroll
function setupProjectAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all project cards and other animated elements
    const animatedElements = document.querySelectorAll('.project-card, .blog-post, .about, .contact');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Mobile menu setup (for future enhancement)
function setupMobileMenu() {
    // This is a placeholder for mobile menu functionality
    // You can add a hamburger menu here for mobile devices
    const navLinks = document.querySelector('.nav-links');
    
    // Add mobile menu button if nav-links exist
    if (navLinks && window.innerWidth <= 768) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.style.cssText = `
            display: block;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        `;
        
        // Insert mobile menu button
        const nav = document.querySelector('nav');
        nav.appendChild(mobileMenuBtn);
        
        // Hide nav links on mobile
        navLinks.style.display = 'none';
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            if (navLinks.style.display === 'none') {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(0, 0, 0, 0.9)';
                navLinks.style.padding = '1rem';
                this.innerHTML = '✕';
            } else {
                navLinks.style.display = 'none';
                this.innerHTML = '☰';
            }
        });
    }
}

// Typing effect for hero section
function setupTypingEffect() {
    const heroText = document.querySelector('.hero p');
    if (heroText) {
        const originalText = heroText.textContent;
        heroText.textContent = '';
        
        let index = 0;
        const typingSpeed = 50;
        
        function typeText() {
            if (index < originalText.length) {
                heroText.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeText, typingSpeed);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeText, 1000);
    }
}

// Project links tracking (for analytics)
function trackProjectClick(projectName, linkType) {
    console.log(`Project clicked: ${projectName} - ${linkType}`);
    // Add your analytics tracking code here
    // Example: gtag('event', 'click', { project: projectName, link_type: linkType });
}

// Add click tracking to project links
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('project-link')) {
        const projectCard = e.target.closest('.project-card');
        const projectName = projectCard ? projectCard.querySelector('h4').textContent : 'Unknown';
        const linkType = e.target.textContent.trim();
        trackProjectClick(projectName, linkType);
    }
});

// Intersection Observer for lazy loading images (if you add images later)
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Theme toggle functionality (optional enhancement)
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
}

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = ['#contactForm', 'header', '.hero'];
    
    requiredElements.forEach(selector => {
        if (!document.querySelector(selector)) {
            console.warn(`Required element not found: ${selector}`);
        }
    });
}

// Initialize error handling
handleMissingElements();

// Export functions for potential use in other scripts
window.portfolioUtils = {
    trackProjectClick,
    debounce,
    isValidEmail,
    validateForm
};