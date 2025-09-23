// Quantum Plumbing & Gas - Premium JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== PROFESSIONAL PAGE LOAD ANIMATIONS =====
    function initPageLoadAnimations() {
        // Remove loading screen first
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    if (loadingScreen) loadingScreen.remove();
                }, 500);
            }, 800);
        }
        
        // Trigger page load animations after loading screen starts fading
        setTimeout(() => {
            const animatedElements = document.querySelectorAll('.page-load-hidden');
            animatedElements.forEach((element, index) => {
                // Remove the hidden class to trigger the animation
                element.classList.remove('page-load-hidden');
            });
        }, 1000);
    }
    
    // Initialize page load animations
    initPageLoadAnimations();
    
    // ===== SIMPLE LOADING SCREEN =====
    document.body.style.opacity = '1';
    
    // ===== SIMPLE PAGE TRANSITIONS =====
    // Add simple page transition for navigation links
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip external links and current page
            if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
                return;
            }
            
            // Add a simple fade effect
            document.body.style.transition = 'opacity 0.3s ease';
            document.body.style.opacity = '0.7';
        });
    });
    
    // ===== NAVIGATION =====
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Navbar scroll effect
    if (navbar) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ENHANCED SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px 100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-delay') || 0;
                
                // Apply animation with custom delay
                setTimeout(() => {
                    element.classList.add('animated');
                    
                    // If this is a cascade trigger, animate the cascade items
                    if (element.classList.contains('cascade-trigger')) {
                        const cascadeItems = element.parentElement.querySelectorAll('.cascade-item');
                        cascadeItems.forEach(item => {
                            const cascadeDelay = parseInt(item.getAttribute('data-cascade-delay')) || 0;
                            setTimeout(() => {
                                item.classList.add('animated');
                            }, cascadeDelay);
                        });
                    }
                }, parseInt(delay));
                
                // Stagger animations for grids
                if (element.classList.contains('services-grid') || 
                    element.classList.contains('trust-grid')) {
                    const items = element.children;
                    Array.from(items).forEach((item, index) => {
                        const itemDelay = item.getAttribute('data-delay') || (index * 100);
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, parseInt(itemDelay));
                    });
                }
                
                // Stop observing this element after animation
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll, .services-grid, .trust-grid').forEach(el => {
        observer.observe(el);
    });
    
    // ===== COUNTER ANIMATIONS =====
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        updateCounter();
    }
    
    // Animate counters when they come into view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    document.querySelectorAll('[data-target]').forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // ===== TESTIMONIALS SLIDER =====
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.testimonial-controls .prev');
    const nextBtn = document.querySelector('.testimonial-controls .next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto-advance testimonials
    if (testimonialCards.length > 0) {
        setInterval(nextTestimonial, 5000);
    }
    
    // ===== SERVICES PAGE FUNCTIONALITY =====
    
    // Service category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const serviceCards = document.querySelectorAll('.service-card, .emergency-card, .gas-service-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter cards (simplified for demo)
            serviceCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    card.style.display = cardCategory === category ? 'block' : 'none';
                }
            });
        });
    });
    
    // Commercial service type switching
    const commercialTypes = document.querySelectorAll('.commercial-type');
    const detailPanels = document.querySelectorAll('.detail-panel');
    
    commercialTypes.forEach(type => {
        type.addEventListener('click', () => {
            const targetPanel = type.getAttribute('data-type');
            
            // Update active type
            commercialTypes.forEach(t => t.classList.remove('active'));
            type.classList.add('active');
            
            // Show corresponding panel
            detailPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${targetPanel}-panel`) {
                    panel.classList.add('active');
                }
            });
        });
    });
    
    // ===== CONTACT FORM FUNCTIONALITY =====
    const contactForm = document.getElementById('quoteForm');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-steps .step');
    const progressFill = document.querySelector('.progress-fill');
    const nextStepBtns = document.querySelectorAll('.next-step');
    const prevStepBtns = document.querySelectorAll('.prev-step');
    let currentStep = 1;
    
    function updateFormStep(step) {
        // Update form steps
        formSteps.forEach((formStep, index) => {
            formStep.classList.toggle('active', index + 1 === step);
        });
        
        // Update progress
        progressSteps.forEach((progressStep, index) => {
            progressStep.classList.toggle('active', index + 1 <= step);
        });
        
        // Update progress bar
        if (progressFill) {
            progressFill.style.width = `${(step / formSteps.length) * 100}%`;
        }
        
        currentStep = step;
    }
    
    nextStepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateCurrentStep()) {
                updateFormStep(currentStep + 1);
            }
        });
    });
    
    prevStepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            updateFormStep(currentStep - 1);
        });
    });
    
    function validateCurrentStep() {
        const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const requiredFields = currentFormStep.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#dc3545';
                isValid = false;
            } else {
                field.style.borderColor = '#dee2e6';
            }
        });
        
        if (!isValid) {
            showNotification('Please fill in all required fields.', 'error');
        }
        
        return isValid;
    }
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateCurrentStep()) return;
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! We\'ll contact you within 2 hours.', 'success');
                this.reset();
                updateFormStep(1);
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    // ===== FAQ FUNCTIONALITY =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // ===== BACK TO TOP BUTTON =====
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const iconClass = type === 'success' ? 'fa-check-circle' : 
                         type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${iconClass}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Styles
        const bgColor = type === 'success' ? '#28a745' : 
                       type === 'error' ? '#dc3545' : '#0066cc';
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.3s ease;
            max-width: 350px;
        `;
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // ===== PARALLAX EFFECTS =====
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = scrolled * 0.5;
            element.style.transform = `translateY(${speed}px)`;
        });
    });
    
    // ===== HERO SCROLL INDICATOR =====
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', () => {
            const nextSection = document.querySelector('.trust-section') || 
                              document.querySelector('.services-preview');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Debounce scroll events
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
    
    // Lazy loading for images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
    
    // ===== PAGE TRANSITIONS =====
    
    // Add page transition effects
    function addPageTransition() {
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';
        document.body.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Initialize page transition
    addPageTransition();
    
    // ===== ANALYTICS TRACKING =====
    
    // Track button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonType = this.classList.contains('btn-emergency') ? 'emergency' : 'standard';
            
            // Analytics tracking (replace with your analytics code)
            console.log('Button clicked:', { text: buttonText, type: buttonType });
        });
    });
    
    // Track form interactions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            console.log('Form submitted:', this.id || 'unnamed form');
        });
    });
    
    // ===== ERROR HANDLING =====
    
    window.addEventListener('error', function(e) {
        console.warn('JavaScript error caught:', e.message);
        // Could send to error tracking service
    });
    
    // ===== ACCESSIBILITY ENHANCEMENTS =====
    
    // Keyboard navigation for custom elements
    document.querySelectorAll('.testimonial-controls button').forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Focus management for mobile menu
    if (hamburger) {
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // ===== PRELOAD CRITICAL RESOURCES =====
    
    const criticalImages = [
        'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop&crop=center'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // ===== SERVICE WORKER (FOR PWA FEATURES) =====
    
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Uncomment when service worker is implemented
            // navigator.serviceWorker.register('/sw.js');
        });
    }
    
    // ===== DYNAMIC COPYRIGHT YEAR =====
    // Update copyright year automatically
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
    
});

// ===== UTILITY FUNCTIONS =====

// Format phone numbers
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4})(\d{6})$/);
    if (match) {
        return `+${match[1]} ${match[2]} ${match[3]}`;
    }
    return phoneNumber;
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate UK phone number
function isValidUKPhone(phone) {
    const ukPhoneRegex = /^(\+44|0)[1-9]\d{8,9}$/;
    return ukPhoneRegex.test(phone.replace(/\s/g, ''));
}

// Get user's location (for service area checking)
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject(new Error('Geolocation not supported'));
        }
    });
}

// Check if user is in service area (simplified)
function isInServiceArea(lat, lng) {
    // Staffordshire coordinates (approximate)
    const staffordshireLat = 52.8007;
    const staffordshireLng = -2.1186;
    const serviceRadius = 50; // km
    
    const distance = calculateDistance(lat, lng, staffordshireLat, staffordshireLng);
    return distance <= serviceRadius;
}

// Calculate distance between coordinates
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP'
    }).format(amount);
}

// ===== PERFORMANCE MONITORING =====

// Monitor page load performance
window.addEventListener('load', () => {
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});

// Monitor scroll performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
            // Scroll performance monitoring
        }, 16); // 60fps
    }
});

// Export functions for use in other scripts
window.QuantumPlumbing = {
    formatPhoneNumber,
    isValidEmail,
    isValidUKPhone,
    getUserLocation,
    isInServiceArea,
    formatCurrency
};