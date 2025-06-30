// DOM Elements
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const header = document.getElementById('header');

// Mobile Menu Toggle
function toggleMobileMenu() {
    mobileMenuOverlay.style.display = mobileMenuOverlay.style.display === 'block' ? 'none' : 'block';
}

function closeMobileMenu() {
    mobileMenuOverlay.style.display = 'none';
}

// Event Listeners for Mobile Menu
mobileMenuToggle.addEventListener('click', toggleMobileMenu);
mobileMenuClose.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking on nav links
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Smooth Scrolling for Navigation Links
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

// Header Scroll Effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(31, 31, 31, 0.98)';
    } else {
        header.style.background = 'rgba(31, 31, 31, 0.95)';
    }
});

// Contact Form Handling
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
        showToast('Error', 'Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showToast('Error', 'Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showToast('Success', 'Your message has been sent successfully! We\'ll get back to you soon.', 'success');
        
        // Log the form data (in a real app, this would be sent to a server)
        console.log('Contact form submission:', {
            ...data,
            timestamp: new Date().toISOString()
        });
    }, 1000);
});

// Toast Notification Function
function showToast(title, message, type = 'success') {
    const toastIcon = toast.querySelector('.toast-icon i');
    const toastTitle = toast.querySelector('.toast-title');
    const toastDescription = toast.querySelector('.toast-description');
    
    // Set content
    toastTitle.textContent = title;
    toastDescription.textContent = message;
    
    // Set icon based on type
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle';
        toastIcon.style.color = '#10b981';
    } else if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
        toastIcon.style.color = '#ef4444';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Intersection Observer for Animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .portfolio-card, .achievement-card, .testimonial-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Preload Images
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle form select styling
document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('select[name="service"]');
    if (select) {
        // Add custom styling for select options
        select.addEventListener('focus', () => {
            select.style.borderColor = 'var(--primary-red)';
        });
        
        select.addEventListener('blur', () => {
            select.style.borderColor = 'var(--border-gray)';
        });
    }
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && mobileMenuOverlay.style.display === 'block') {
        closeMobileMenu();
    }
    
    // Close toast with Escape key
    if (e.key === 'Escape' && toast.classList.contains('show')) {
        toast.classList.remove('show');
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(31, 31, 31, 0.98)';
    } else {
        header.style.background = 'rgba(31, 31, 31, 0.95)';
    }
}, 16);

window.removeEventListener('scroll', window.addEventListener);
window.addEventListener('scroll', throttledScrollHandler);