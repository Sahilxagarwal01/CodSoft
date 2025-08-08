// Fixed Advanced Portfolio JavaScript
class PortfolioApp {
  constructor() {
    this.currentPage = 'home';
    this.isLoading = true;
    this.init();
  }

  init() {
    // Ensure DOM is ready before initializing
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupApp();
      });
    } else {
      this.setupApp();
    }
  }

  setupApp() {
    console.log('Setting up portfolio app...');
    
    // Initialize all components
    this.bindEvents();
    this.initLoadingScreen();
    this.initTypingAnimation();
    this.initParticles();
    this.initScrollAnimations();
    
    console.log('Portfolio app setup complete');
  }

  bindEvents() {
    // Navigation must be set up first
    this.handleNavigation();
    this.handleMobileMenu();
    this.handleFormSubmission();
    this.handleDownloads();

    // Window events
    window.addEventListener('resize', () => this.handleResize());
    window.addEventListener('scroll', () => this.handleScroll());
  }

  // Loading Screen Animation
  initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        this.isLoading = false;
        
        setTimeout(() => {
          this.animateHeroContent();
        }, 500);
      }
    }, 1500);
  }

  // Navigation System - COMPLETELY REWRITTEN
  handleNavigation() {
    console.log('Setting up navigation...');
    
    // Get all navigation elements
    const navLinks = document.querySelectorAll('.nav-link');
    const heroButtons = document.querySelectorAll('button[data-page], .btn[data-page]');
    
    console.log('Found nav links:', navLinks.length);
    console.log('Found hero buttons:', heroButtons.length);

    // Set up navigation link handlers
    navLinks.forEach((link, index) => {
      console.log(`Setting up nav link ${index}:`, link.getAttribute('data-page'));
      
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const targetPage = link.getAttribute('data-page');
        console.log('Navigation link clicked:', targetPage);
        
        if (targetPage) {
          this.navigateToPage(targetPage);
          this.setActiveNavLink(link);
          this.closeMobileMenu();
        }
      });

      // Also handle mouse events for better responsiveness
      link.addEventListener('mousedown', (e) => {
        e.preventDefault();
      });
    });

    // Set up hero button handlers
    heroButtons.forEach((button, index) => {
      console.log(`Setting up hero button ${index}:`, button.getAttribute('data-page'));
      
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const targetPage = button.getAttribute('data-page');
        console.log('Hero button clicked:', targetPage);
        
        if (targetPage) {
          this.navigateToPage(targetPage);
          this.updateNavForPage(targetPage);
        }
      });
    });

    // Set initial active state
    this.setInitialNavState();
    
    console.log('Navigation setup complete');
  }

  // Simplified navigation function
  navigateToPage(targetPage) {
    console.log(`Navigating to page: ${targetPage}`);
    
    if (!targetPage || targetPage === this.currentPage) {
      console.log('Navigation cancelled - same page or invalid target');
      return;
    }

    // Hide current page
    const currentPageEl = document.querySelector('.page.active');
    if (currentPageEl) {
      currentPageEl.classList.remove('active');
      console.log('Removed active from current page');
    }

    // Show target page
    const targetPageEl = document.getElementById(targetPage);
    if (targetPageEl) {
      targetPageEl.classList.add('active');
      console.log(`Added active to ${targetPage}`);
      
      // Update current page
      this.currentPage = targetPage;
      
      // Scroll to top
      window.scrollTo(0, 0);
      
      // Trigger animations
      setTimeout(() => {
        this.triggerPageAnimations(targetPage);
      }, 100);
      
    } else {
      console.error(`Target page element not found: ${targetPage}`);
    }
  }

  // Set active navigation link
  setActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }

  // Update navigation for a specific page
  updateNavForPage(targetPage) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      if (link.getAttribute('data-page') === targetPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Set initial navigation state
  setInitialNavState() {
    const homeLink = document.querySelector('.nav-link[data-page="home"]');
    if (homeLink) {
      homeLink.classList.add('active');
      console.log('Set home link as active');
    }
  }

  // Page-specific Animations
  triggerPageAnimations(page) {
    console.log('Triggering animations for:', page);
    
    switch (page) {
      case 'skills':
        setTimeout(() => this.animateSkillBars(), 300);
        break;
      case 'projects':
        setTimeout(() => this.animateProjectCards(), 200);
        break;
      case 'education':
        setTimeout(() => this.animateTimeline(), 200);
        break;
      case 'about':
        setTimeout(() => this.animateProfileImage(), 200);
        break;
    }
  }

  // Skills Bar Animation
  animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    console.log('Animating skill bars:', skillItems.length);
    
    skillItems.forEach((item, index) => {
      const progressBar = item.querySelector('.skill-progress');
      const skillLevel = item.getAttribute('data-skill');
      
      if (progressBar && skillLevel) {
        progressBar.style.width = '0%';
        progressBar.style.transition = 'none';
        
        setTimeout(() => {
          progressBar.style.transition = 'width 1.5s ease';
          progressBar.style.width = skillLevel + '%';
        }, index * 200 + 100);
      }
    });
  }

  // Project Cards Animation
  animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 150);
    });
  }

  // Timeline Animation
  animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-30px)';
      
      setTimeout(() => {
        item.style.transition = 'all 0.8s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, index * 200);
    });
  }

  // Profile Image Animation
  animateProfileImage() {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
      profileImage.style.animation = 'profileGlow 2s ease-in-out infinite alternate';
    }
  }

  // Contact Form Handling - FIXED
  handleFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      console.log('Setting up contact form');
      
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Contact form submitted');
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        if (!submitBtn) return;
        
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simulate form submission
        setTimeout(() => {
          // Show success message
          submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
          submitBtn.style.background = 'linear-gradient(45deg, #4caf50, #8bc34a)';
          submitBtn.style.opacity = '1';
          
          // Reset form
          contactForm.reset();
          
          // Show success notification
          this.showNotification('Your message has been sent successfully! I will get back to you soon.', 'success');
          
          // Reset button after delay
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
          }, 4000);
          
        }, 1500);
      });
    }
  }

  // Download Handlers - ENHANCED
  handleDownloads() {
    const downloadBtn = document.querySelector('.download-btn');
    const printBtn = document.querySelector('.print-btn');
    
    if (downloadBtn) {
      downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Download button clicked');
        
        // Show download started notification
        this.showNotification('Resume download started! (Demo - no actual file)', 'info');
        
        // Simulate download
        downloadBtn.innerHTML = '<i class="fas fa-download fa-spin"></i> <span>Downloading...</span>';
        downloadBtn.disabled = true;
        
        setTimeout(() => {
          downloadBtn.innerHTML = '<i class="fas fa-check"></i> <span>Downloaded!</span>';
          
          setTimeout(() => {
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> <span>Download PDF</span>';
            downloadBtn.disabled = false;
          }, 2000);
        }, 1000);
      });
    }
    
    if (printBtn) {
      printBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Print button clicked');
        
        const resumeContent = document.querySelector('.resume-preview');
        if (resumeContent) {
          // Create print window
          const printWindow = window.open('', '_blank');
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Sahil Agarwal - Resume</title>
                <style>
                  * { margin: 0; padding: 0; box-sizing: border-box; }
                  body { 
                    font-family: Arial, sans-serif; 
                    line-height: 1.6; 
                    color: #333; 
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                  }
                  .resume-header { 
                    text-align: center; 
                    margin-bottom: 2rem; 
                    border-bottom: 2px solid #333; 
                    padding-bottom: 1rem; 
                  }
                  .resume-header h1 { 
                    color: #333; 
                    font-size: 2.5rem; 
                    margin-bottom: 0.5rem; 
                  }
                  .resume-tagline {
                    font-size: 1.2rem;
                    color: #666;
                    margin-bottom: 1rem;
                  }
                  .resume-contact {
                    color: #666;
                  }
                  .resume-section { 
                    margin-bottom: 2rem; 
                  }
                  .resume-section h3 { 
                    color: #333; 
                    border-left: 4px solid #64b5f6; 
                    padding-left: 1rem; 
                    margin-bottom: 1rem; 
                    font-size: 1.3rem;
                  }
                  .resume-item { 
                    margin-bottom: 1rem; 
                    padding-left: 1rem; 
                  }
                  .personal-info { 
                    display: grid; 
                    grid-template-columns: 1fr 1fr; 
                    gap: 1rem; 
                  }
                  @media print { 
                    body { margin: 0; padding: 10px; }
                    .resume-header h1 { font-size: 2rem; }
                  }
                </style>
              </head>
              <body>
                ${resumeContent.innerHTML}
              </body>
            </html>
          `);
          
          printWindow.document.close();
          
          setTimeout(() => {
            printWindow.print();
            this.showNotification('Print dialog opened!', 'success');
          }, 500);
        }
      });
    }
  }

  // Mobile Menu Handling
  handleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
      hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Hamburger menu clicked');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }
  }

  closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }

  // Enhanced Notification System
  showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const bgColor = type === 'success' ? '#4caf50' : 
                   type === 'error' ? '#f44336' : 
                   type === 'warning' ? '#ff9800' : '#2196f3';
    
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${bgColor};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10001;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      font-weight: 500;
      max-width: 350px;
      font-family: 'Exo 2', sans-serif;
      border-left: 4px solid rgba(255,255,255,0.5);
    `;
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 
                           type === 'error' ? 'exclamation-circle' :
                           type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }

  // Typing Animation
  initTypingAnimation() {
    setTimeout(() => {
      const typingText = document.querySelector('.typing-text');
      if (!typingText) return;

      const text = 'Sahil Agarwal';
      let index = 0;
      
      typingText.textContent = '';
      
      const typeWriter = () => {
        if (index < text.length) {
          typingText.textContent += text.charAt(index);
          index++;
          setTimeout(typeWriter, 100);
        }
      };

      if (!this.isLoading) {
        typeWriter();
      }
    }, 2000);
  }

  // Particles System
  initParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 2}px;
        height: ${Math.random() * 3 + 2}px;
        background: rgba(100, 181, 246, ${Math.random() * 0.4 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 15}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
        z-index: -1;
      `;
      particlesContainer.appendChild(particle);
    }
  }

  // Hero Content Animation
  animateHeroContent() {
    const heroElements = [
      { selector: '.hero-subtitle', delay: 0 },
      { selector: '.hero-traits', delay: 200 },
      { selector: '.hero-description', delay: 400 },
      { selector: '.hero-buttons', delay: 600 }
    ];

    heroElements.forEach(({ selector, delay }) => {
      const element = document.querySelector(selector);
      if (element) {
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, delay);
      }
    });
  }

  // Scroll Animations
  initScrollAnimations() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.1 });

      const animateElements = document.querySelectorAll('.trait-card, .soft-skill-card, .contact-item');
      animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
      });
    }
  }

  // Scroll Handler
  handleScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
      } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.boxShadow = 'none';
      }
    }
  }

  // Resize Handler
  handleResize() {
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }
  }
}

// Button Effects Class
class ButtonEffects {
  static init() {
    console.log('Initializing button effects...');
    
    const allButtons = document.querySelectorAll('.btn');
    console.log('Found buttons for effects:', allButtons.length);
    
    allButtons.forEach((btn, index) => {
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      
      // Add ripple effect
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: ripple 0.6s linear;
          left: ${x}px;
          top: ${y}px;
          width: ${size}px;
          height: ${size}px;
          pointer-events: none;
          z-index: 0;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.remove();
          }
        }, 600);
      });
    });
  }
}

// Custom CSS animations
const customStyles = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  @keyframes profileGlow {
    from {
      box-shadow: 0 0 20px rgba(100, 181, 246, 0.4);
    }
    to {
      box-shadow: 0 0 40px rgba(100, 181, 246, 0.8);
    }
  }

  /* Hero content initial state */
  .hero-subtitle,
  .hero-traits,
  .hero-description,
  .hero-buttons {
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s ease;
  }

  /* Enhanced button styles */
  .btn {
    cursor: pointer !important;
    user-select: none;
  }

  .btn:hover {
    transform: translateY(-2px);
  }

  .btn:active {
    transform: translateY(0);
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = customStyles;
document.head.appendChild(styleSheet);

// Initialize the application
console.log('Initializing Portfolio App...');

// Create app instance
const portfolioApp = new PortfolioApp();

// Initialize button effects
setTimeout(() => {
  ButtonEffects.init();
}, 500);

// Debug information
window.portfolioApp = portfolioApp;
console.log('Portfolio app initialized and available as window.portfolioApp');