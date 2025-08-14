// SleepTide Website JavaScript
// Smooth animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initScrollAnimations();
    initSmoothScrolling();
    initParallaxEffects();
    initMobileOptimizations();
    initPerformanceOptimizations();
});

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animations for feature items
                if (entry.target.classList.contains('feature-item')) {
                    const image = entry.target.querySelector('.feature-image img');
                    const content = entry.target.querySelector('.feature-content');
                    
                    if (image && content) {
                        setTimeout(() => {
                            image.style.transform = 'translateY(0) scale(1)';
                            image.style.opacity = '1';
                        }, 200);
                        
                        setTimeout(() => {
                            content.style.transform = 'translateY(0)';
                            content.style.opacity = '1';
                        }, 400);
                    }
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll([
        '.hero-content',
        '.hero-phone',
        '.section-title',
        '.feature-item',
        '.cta-content'
    ].join(','));

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Special handling for feature images and content
    const featureImages = document.querySelectorAll('.feature-image img');
    const featureContents = document.querySelectorAll('.feature-content');
    
    featureImages.forEach(img => {
        img.style.transform = 'translateY(50px) scale(0.9)';
        img.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
    });
    
    featureContents.forEach(content => {
        content.style.transform = 'translateY(30px)';
        content.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
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
}

// Parallax effects for hero section
function initParallaxEffects() {
    const heroPhone = document.querySelector('.hero-phone');
    const waveAnimation = document.querySelector('.wave-animation');
    
    if (!heroPhone || !waveAnimation) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        const waveRate = scrolled * 0.1;
        
        if (heroPhone) {
            heroPhone.style.transform = `translateY(${rate}px)`;
        }
        
        if (waveAnimation) {
            waveAnimation.style.transform = `translateY(${waveRate}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Mobile-specific optimizations
function initMobileOptimizations() {
    // Improve touch interactions
    const appStoreLinks = document.querySelectorAll('.app-store-link');
    
    appStoreLinks.forEach(link => {
        // Add touch feedback
        link.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        link.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            
            // Track download attempt
            if (typeof gtag !== 'undefined') {
                gtag('event', 'app_download_attempt', {
                    'event_category': 'engagement',
                    'event_label': 'app_store_click'
                });
            }
        }, { passive: true });
        
        link.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });
    
    // Optimize animations for mobile
    if (window.innerWidth <= 768) {
        document.documentElement.style.setProperty('--animation-duration', '0.6s');
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy load images that are not immediately visible
    const images = document.querySelectorAll('img[src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            if (img.src.includes('02.png') || img.src.includes('03.png') || 
                img.src.includes('04.png') || img.src.includes('05.png') || 
                img.src.includes('06.png')) {
                imageObserver.observe(img);
            }
        });
    }
    
    // Preload critical resources
    const preloadLinks = [
        { href: 'MEDIA/01.png', as: 'image' },
        { href: 'MEDIA/AppStoreWht.svg', as: 'image' }
    ];
    
    preloadLinks.forEach(link => {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = link.href;
        preloadLink.as = link.as;
        document.head.appendChild(preloadLink);
    });
}

// Add CSS class for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .feature-image img.animate-in {
        transform: translateY(0) scale(1) !important;
    }
    
    .feature-content.animate-in {
        transform: translateY(0) !important;
    }
    
    /* Reduced motion for accessibility */
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger hero animations after load
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        const heroPhone = document.querySelector('.hero-phone');
        
        if (heroContent) heroContent.classList.add('animate-in');
        if (heroPhone) heroPhone.classList.add('animate-in');
    }, 100);
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('Failed to load image:', this.src);
        this.style.opacity = '0.5';
    });
});

// Analytics helper functions
window.sleepTideAnalytics = {
    trackEvent: function(action, category = 'engagement') {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': window.location.pathname
            });
        }
    },
    
    trackDownload: function(source = 'header') {
        this.trackEvent('app_download_click', 'conversion');
        
        // You can add additional tracking here
        console.log('Download tracked from:', source);
    }
};