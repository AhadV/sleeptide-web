// SleepTide Website JavaScript
// Simple interactions without animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize basic functionality
    initBasicInteractions();
    initPerformanceOptimizations();
});

// Basic interactions without animations
function initBasicInteractions() {
    // Smooth scrolling for anchor links (if any)
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

    // Track download attempts
    const appStoreLinks = document.querySelectorAll('.app-store-link');
    
    appStoreLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track download attempt
            if (typeof gtag !== 'undefined') {
                gtag('event', 'app_download_attempt', {
                    'event_category': 'engagement',
                    'event_label': 'app_store_click'
                });
            }
            
            // You can add additional tracking here
            console.log('SleepTide download attempted');
        });
    });
    
    // Handle orientation changes on mobile
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Ensure proper layout after orientation change
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
        
        // Only observe images beyond the first one
        images.forEach((img, index) => {
            if (index > 0) {
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
        console.log('Download tracked from:', source);
    }
};