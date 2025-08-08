// Advanced JavaScript for Sahil Agarwal's Portfolio
// Handles animations, interactions, and dynamic effects

class PortfolioApp {
    constructor() {
        this.init();
        this.bindEvents();
        this.createParticles();
        this.setupIntersectionObserver();
        this.startTypewriter();
    }

    init() {
        // Initialize loading screen
        this.showLoadingScreen();
        
        // Initialize cursor trail
        this.initCursorTrail();
        
        // Initialize navigation
        this.initNavigation();
        
        // Initialize form
        this.initContactForm();
        
        // Initialize dynamic background
        this.initDynamicBackground();
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        // Hide loading screen after 3 seconds
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 3000);
    }

    initCursorTrail() {
        const cursorTrail = document.querySelector('.cursor-trail');
        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorTrail.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursorTrail.style.opacity = '0';
        });

        // Smooth trail animation
        const updateTrail = () => {
            const dx = mouseX - trailX;
            const dy = mouseY - trailY;
            
            trailX += dx * 0.1;
            trailY += dy * 0.1;
            
            cursorTrail.style.transform = `translate(${trailX - 10}px, ${trailY - 10}px)`;
            requestAnimationFrame(updateTrail);
        };
        
        updateTrail();
    }

    initNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random positioning and animation
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            
            // Random sizes and colors
            const size = 1 + Math.random() * 3;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            const colors = [
                'rgba(102, 126, 234, 0.3)',
                'rgba(118, 75, 162, 0.3)',
                'rgba(255, 107, 107, 0.3)',
                'rgba(78, 205, 196, 0.3)',
                'rgba(69, 183, 209, 0.3)'
            ];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particlesContainer.appendChild(particle);
        }
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    
                    // Trigger specific animations based on section
                    if (entry.target.classList.contains('skills-section')) {
                        this.animateSkillBars();
                    }
                    
                    if (entry.target.classList.contains('timeline-item')) {
                        entry.target.classList.add('slide-in-left');
                    }
                    
                    if (entry.target.classList.contains('experience-card')) {
                        entry.target.classList.add('slide-in-right');
                    }
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        const elementsToObserve = document.querySelectorAll('section, .timeline-item, .experience-card, .trait-card');
        elementsToObserve.forEach(el => observer.observe(el));
    }

    animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            const skillLevel = item.dataset.skill;
            const progressBar = item.querySelector('.skill-progress');
            
            setTimeout(() => {
                progressBar.style.width = skillLevel + '%';
            }, index * 200); // Stagger the animations
        });
    }

    startTypewriter() {
        const taglineElement = document.getElementById('tagline');
        const text = 'Calm, Diligence, Adaptive';
        let index = 0;

        const typeWriter = () => {
            if (index < text.length) {
                taglineElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 150);
            }
        };

        // Start typewriter after loading screen
        setTimeout(typeWriter, 3500);
    }

    initDynamicBackground() {
        const heroSection = document.querySelector('.hero-section');
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
            
            // Update CSS custom properties for dynamic gradients
            const hue1 = Math.floor(mouseX * 60 + 220); // Blue to purple range
            const hue2 = Math.floor(mouseY * 60 + 280); // Purple to pink range
            
            heroSection.style.background = `
                linear-gradient(135deg, 
                    hsl(${hue1}, 70%, 25%) 0%, 
                    hsl(${hue2}, 60%, 30%) 100%)
            `;
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            heroSection.style.transform = `translateY(${parallax}px)`;
        });
    }

    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                this.showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                this.showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Simulate form submission with loading animation
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Show success state
                submitBtn.innerHTML = '<span>✓ Message Sent!</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                submitBtn.style.opacity = '1';

                // Show success notification
                this.showNotification(`Thank you ${name}! Your message has been sent successfully.`, 'success');

                // Reset form
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'linear-gradient(135deg, var(--color-accent-3), var(--color-accent-2))';
                    submitBtn.style.opacity = '1';
                }, 3000);

            } catch (error) {
                // Handle error state
                submitBtn.innerHTML = '<span>Error - Try Again</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                this.showNotification('Something went wrong. Please try again.', 'error');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'linear-gradient(135deg, var(--color-accent-3), var(--color-accent-2))';
                    submitBtn.style.opacity = '1';
                }, 3000);
            }
        });

        // Real-time validation feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('placeholder') || field.name;
        
        // Remove existing error styling
        field.style.borderColor = '';
        
        if (!value) {
            field.style.borderColor = 'var(--color-error)';
            return false;
        }
        
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.style.borderColor = 'var(--color-error)';
                return false;
            }
        }
        
        field.style.borderColor = 'var(--color-success)';
        return true;
    }

    bindEvents() {
        // CTA buttons
        const downloadBtn = document.getElementById('downloadBtn');
        const contactBtn = document.getElementById('contactBtn');

        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add ripple effect
            this.createRipple(e, downloadBtn);
            
            // Create a mock resume download
            this.downloadResume();
        });

        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add ripple effect
            this.createRipple(e, contactBtn);
            
            // Smooth scroll to contact section
            const contactSection = document.getElementById('contact');
            const headerOffset = 80;
            const elementPosition = contactSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            this.showNotification('Scrolling to contact section', 'info');
        });

        // Add hover effects to cards
        this.addCardHoverEffects();
        
        // Add scroll animations
        this.addScrollAnimations();
        
        // Add keyboard navigation
        this.addKeyboardNavigation();
    }

    downloadResume() {
        // Create a mock PDF resume
        const resumeContent = this.generateResumeContent();
        
        // Create blob and download
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Sahil_Agarwal_Resume.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        this.showNotification('Resume downloaded successfully!', 'success');
    }

    generateResumeContent() {
        return `
SAHIL AGARWAL
Calm, Diligence, Adaptive

CONTACT INFORMATION
Address: JECRC Foundation, Shri Ram ki Nangal, via Sitapura RIICO, Tonk Road
Phone: +91 8278677828

CAREER OBJECTIVE
To obtain a challenging position in a dynamic organization where I can utilize my skills and knowledge to contribute effectively and grow professionally.

EDUCATION
2024-2025: B.Tech First Year - Rajasthan Technical University, JECRC Foundation, CGPA: Sem1-8.0
2024: XII (Senior Secondary) - RBSE Board, Sony Academy School, 85%
2022: X (Secondary) - RBSE Board, Sony Academy School, 84%

EXPERIENCE
C Programming
- Wrote C programs using loops, arrays, and functions to solve problems from college assignments
- Skills: Loops, Arrays, Functions, Problem Solving

Python Programming
- Developed small Python programs to practice basic coding and logic building
- Skills: Python Basics, Logic Building, Programming Fundamentals

TECHNICAL SKILLS
- Programming Languages: C, Python, Basic Programming Concepts
- Technical Skills: Problem Solving, Logic Development, Algorithm Design
- Soft Skills: Calm, Diligent, Adaptive, Team Work

PERSONAL TRAITS
- Calm: Maintaining composure under pressure
- Diligent: Persistent and hardworking approach
- Adaptive: Quick to learn and adjust
        `.trim();
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addCardHoverEffects() {
        const cards = document.querySelectorAll('.trait-card, .timeline-content, .experience-card, .skill-category, .contact-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    addScrollAnimations() {
        // Animate elements on scroll
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('[data-animate]');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('animate');
                }
            });
        };

        window.addEventListener('scroll', animateOnScroll);
        
        // Add scroll progress indicator
        this.addScrollProgress();
    }

    addScrollProgress() {
        // Create scroll progress bar
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(135deg, var(--color-accent-3), var(--color-accent-2));
            z-index: 9999;
            transition: width 0.25s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    addKeyboardNavigation() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl + H for home
            if (e.ctrlKey && e.key === 'h') {
                e.preventDefault();
                document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
            }
            
            // Ctrl + C for contact
            if (e.ctrlKey && e.key === 'c') {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }
            
            // Escape to close mobile menu
            if (e.key === 'Escape') {
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.getElementById('nav-menu');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close" aria-label="Close notification">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto remove after 5 seconds
        const autoRemoveTimeout = setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Manual close
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemoveTimeout);
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }
}

// Additional utility functions
class AnimationUtils {
    static easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    static lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
}

// Mouse follower effect for hero section
class MouseFollower {
    constructor() {
        this.mouse = { x: 0, y: 0 };
        this.follower = { x: 0, y: 0 };
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        this.animate();
    }

    animate() {
        this.follower.x = AnimationUtils.lerp(this.follower.x, this.mouse.x, 0.1);
        this.follower.y = AnimationUtils.lerp(this.follower.y, this.mouse.y, 0.1);

        // Update hero background based on mouse position
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const x = (this.follower.x / window.innerWidth) * 100;
            const y = (this.follower.y / window.innerHeight) * 100;
            
            heroSection.style.setProperty('--mouse-x', `${x}%`);
            heroSection.style.setProperty('--mouse-y', `${y}%`);
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Floating elements animation
class FloatingElements {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            this.elements.push({
                element,
                baseY: parseFloat(getComputedStyle(element).top) || 0,
                amplitude: 10 + Math.random() * 20,
                frequency: 0.01 + Math.random() * 0.02,
                phase: index * 0.5
            });
        });

        if (this.elements.length > 0) {
            this.animate();
        }
    }

    animate() {
        const time = Date.now() * 0.001;

        this.elements.forEach(item => {
            const y = item.baseY + Math.sin(time * item.frequency + item.phase) * item.amplitude;
            item.element.style.transform = `translateY(${y}px)`;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.lastTime = performance.now();
        this.frameCount = 0;
        this.monitor();
    }

    monitor() {
        const currentTime = performance.now();
        this.frameCount++;

        if (currentTime > this.lastTime + 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            // Log performance if needed (for debugging)
            if (this.fps < 30 && window.location.hostname === 'localhost') {
                console.warn(`Low FPS detected: ${this.fps}`);
            }
        }

        requestAnimationFrame(() => this.monitor());
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Main app initialization
    const app = new PortfolioApp();
    
    // Initialize additional effects
    new MouseFollower();
    new FloatingElements();
    
    // Initialize performance monitoring in development
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
        new PerformanceMonitor();
    }

    // Add global error handling
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
    });

    // Add accessibility improvements
    document.addEventListener('keydown', (e) => {
        // Skip to main content with Alt + S
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            document.getElementById('hero').focus();
        }
    });

    // Add focus management for better accessibility
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('[role="dialog"]');
    
    if (modal) {
        const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
        const focusableContent = modal.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
});