// Main JavaScript file for the static website

class Website {
    constructor() {
        this.cursor = null;
        this.preloader = null;
        this.isLoaded = false;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.initPreloader();
        this.initCustomCursor();
        this.initSmoothScrolling();
        this.initScrollAnimations();
        this.initProjectsSlider();
        this.initParallax();
        this.initContactForm();
        this.initMobileMenu();
        this.initServiceItems();
    }

    // Preloader functionality
    initPreloader() {
        this.preloader = document.getElementById('preloader');
        document.body.classList.add('preloader-active');
        
        // Hide preloader after exactly 3 seconds
        setTimeout(() => {
            if (this.preloader) {
                this.preloader.classList.add('hidden');
                document.body.classList.remove('preloader-active');
                setTimeout(() => {
                    this.preloader.style.display = 'none';
                    this.isLoaded = true;
                }, 800);
            }
        }, 3000);
    }

    // Initialize projects slider
    initProjectsSlider() {
        const track = document.querySelector('.projects-track');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        
        if (!track || !prevBtn || !nextBtn) return;

        let currentIndex = 0;
        const slides = track.querySelectorAll('.project-slide');
        const slideWidth = 432; // 400px + 32px gap

        const updateSlider = () => {
            const translateX = -(currentIndex * slideWidth);
            track.style.transform = `translateX(${translateX}px)`;
        };

        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }

    // Custom cursor functionality
    initCustomCursor() {
        this.cursor = document.getElementById('cursor');
        if (!this.cursor) return;

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        // Update mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor animation
        const animateCursor = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.1;
            cursorY += dy * 0.1;
            
            this.cursor.style.left = cursorX + 'px';
            this.cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Handle hover states
        const hoverElements = document.querySelectorAll('a, button, .project-image, .service-item, .intro-logo');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hovered');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hovered');
            });
        });
    }

    // Smooth scrolling for navigation links
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Scroll-triggered animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe service items
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach((item, index) => {
            item.classList.add('animate-on-scroll');
            item.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(item);
        });

        // Observe project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            // Remove existing animation and add scroll-based one
            card.style.animation = 'none';
            card.classList.add('animate-on-scroll');
            card.style.transitionDelay = `${index * 0.2}s`;
            observer.observe(card);
        });

        // Observe contact section
        const contactElements = document.querySelectorAll('.contact-info > *, .contact-form-container');
        contactElements.forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }

    // Parallax effect for showcase section
    initParallax() {
        const parallaxContainer = document.querySelector('.parallax-container');
        const parallaxImage = document.querySelector('.parallax-image');
        
        if (!parallaxContainer || !parallaxImage) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElement = document.querySelector('.parallax-showcase');
            
            if (!parallaxElement) return;
            
            const rect = parallaxElement.getBoundingClientRect();
            const speed = 0.5;
            
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                const yPos = -(scrolled * speed);
                parallaxImage.style.transform = `translateY(${yPos}px) scale(1.1)`;
            }
        });
    }

    // Contact form functionality
    initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            // Simulate form submission
            this.submitForm(data);
        });
    }

    // Simulate form submission (replace with actual API call)
    submitForm(data) {
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#22c55e';
            
            // Reset form
            document.getElementById('contact-form').reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        }, 1500);

        // Log form data (replace with actual submission logic)
        console.log('Form submitted:', data);
    }

    // Mobile menu functionality
    initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        const mobileCloseBtn = document.querySelector('.mobile-close-btn');
        
        if (!mobileMenuBtn || !mobileMenuOverlay) return;

        let isMenuOpen = false;

        const openMenu = () => {
            isMenuOpen = true;
            mobileMenuBtn.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            isMenuOpen = false;
            mobileMenuBtn.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        mobileMenuBtn.addEventListener('click', () => {
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close button functionality
        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', closeMenu);
        }

        // Close menu when clicking nav links
        const mobileNavLinks = mobileMenuOverlay.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking overlay
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                closeMenu();
            }
        });
    }
}

// Utility functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
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
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Initialize the website
const website = new Website();

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Website, utils };
}

// Service items mobile functionality
document.addEventListener('DOMContentLoaded', () => {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                item.classList.toggle('active');
                
                // Close other items
                serviceItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            }
        });
    });
});
// Form focus functionality
document.addEventListener('DOMContentLoaded', () => {
    const formItems = document.querySelectorAll('.form-item');
    
    formItems.forEach(item => {
        const input = item.querySelector('input, textarea');
        const title = item.querySelector('h3');
        
        if (input && title) {
            // Click on title to focus input
            title.addEventListener('click', () => {
                item.classList.add('focused');
                input.focus();
            });
            
            input.addEventListener('focus', () => {
                item.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    item.classList.remove('focused');
                }
            });
        }
    });
});