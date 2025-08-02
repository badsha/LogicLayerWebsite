/**
 * LogicLayer Website Script
 *
 * This script handles all interactive functionality for the website, including:
 * - Mobile menu toggling
 * - Smooth scrolling for anchor links
 * - Scroll-based animations (header background, parallax, fade-in elements)
 * - Contact form submission with validation and toast notifications
 * - Asset preloading for a smoother user experience
 * - Accessibility enhancements (keyboard navigation)
 */
(function() {
    'use strict';

    const App = {
        // --- PROPERTIES ---
        elements: {},
        config: {
            headerScrollThreshold: 50,
            animationThreshold: 0.1,
            scrollThrottleLimit: 16, // Approx. 60fps
        },

        // --- INITIALIZATION ---
        init() {
            this.cacheDOMElements();
            this.bindEvents();
            this.setupObservers();
            this.preloadAssets();
            this.pageLoadAnimation();
        },

        cacheDOMElements() {
            this.elements.header = document.getElementById('header');
            this.elements.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            this.elements.mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
            this.elements.mobileMenuClose = document.getElementById('mobile-menu-close');
            this.elements.contactForm = document.getElementById('contact-form');
            this.elements.toast = document.getElementById('toast');
            this.elements.heroBackground = document.querySelector('.hero-background');
            this.elements.navLinks = document.querySelectorAll('a[href^="#"]');
            this.elements.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
            this.elements.animatedElements = document.querySelectorAll('.service-card, .portfolio-card, .achievement-card, .testimonial-card');
        },

        bindEvents() {
            // Mobile Menu
            this.elements.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu(true));
            this.elements.mobileMenuClose.addEventListener('click', () => this.toggleMobileMenu(false));
            this.elements.mobileMenuOverlay.addEventListener('click', (e) => {
                if (e.target === this.elements.mobileMenuOverlay) {
                    this.toggleMobileMenu(false);
                }
            });
            this.elements.mobileNavLinks.forEach(link => link.addEventListener('click', () => this.toggleMobileMenu(false)));

            // Smooth Scrolling
            this.elements.navLinks.forEach(anchor => anchor.addEventListener('click', this.handleSmoothScroll));

            // Form Submission
            if (this.elements.contactForm) {
                this.elements.contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
            }

            // Scroll Events (Throttled for performance)
            const throttledScrollHandler = this.throttle(this.handleScroll.bind(this), this.config.scrollThrottleLimit);
            window.addEventListener('scroll', throttledScrollHandler);

            // Keyboard Navigation
            document.addEventListener('keydown', this.handleKeyboard.bind(this));
        },

        // --- CORE METHODS ---

        toggleMobileMenu(show) {
            document.body.classList.toggle('menu-open', show);
        },

        handleSmoothScroll(e) {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        },

        handleScroll() {
            const scrollY = window.scrollY;

            // Header background effect
            this.elements.header.classList.toggle('scrolled', scrollY > this.config.headerScrollThreshold);

            // Parallax effect for hero background
            if (this.elements.heroBackground) {
                this.elements.heroBackground.style.transform = `translateY(${scrollY * 0.4}px)`;
            }
        },

        async handleFormSubmit(e) {
            e.preventDefault();
            const form = e.currentTarget;
            const submitButton = form.querySelector('button[type="submit"]');
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Validation
            if (!data.firstName || !data.lastName || !data.email || !data.message) {
                this.showToast({ title: 'Error', message: 'Please fill in all required fields.', type: 'error' });
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                this.showToast({ title: 'Error', message: 'Please enter a valid email address.', type: 'error' });
                return;
            }

            // UI feedback
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log('Form Submitted:', data);
                this.showToast({ title: 'Success', message: 'Your message has been sent successfully!' });
                form.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                this.showToast({ title: 'Error', message: 'Something went wrong. Please try again.', type: 'error' });
            } finally {
                // Restore button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        },

        showToast({ title, message, type = 'success' }) {
            this.elements.toast.querySelector('.toast-title').textContent = title;
            this.elements.toast.querySelector('.toast-description').textContent = message;
            this.elements.toast.dataset.toastType = type; // Use data attribute for styling

            this.elements.toast.classList.add('show');
            setTimeout(() => {
                this.elements.toast.classList.remove('show');
            }, 5000);
        },

        handleKeyboard(e) {
            if (e.key === 'Escape') {
                if (document.body.classList.contains('menu-open')) {
                    this.toggleMobileMenu(false);
                }
                if (this.elements.toast.classList.contains('show')) {
                    this.elements.toast.classList.remove('show');
                }
            }
        },

        // --- SETUP & ENHANCEMENTS ---

        setupObservers() {
            const observerOptions = {
                threshold: this.config.animationThreshold,
                rootMargin: '0px 0px -50px 0px'
            };
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target); // Animate only once
                    }
                });
            }, observerOptions);

            this.elements.animatedElements.forEach(el => observer.observe(el));
        },

        preloadAssets() {
            const images = [
                'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
                'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
                'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
            ];
            images.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        },

        pageLoadAnimation() {
            document.body.style.opacity = '0';
            requestAnimationFrame(() => {
                document.body.style.transition = 'opacity 0.4s ease-in';
                document.body.style.opacity = '1';
            });
        },

        // --- UTILITIES ---

        throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };

    // Run the app
    document.addEventListener('DOMContentLoaded', () => App.init());

})();