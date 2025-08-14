// Scroll effects for SleepTide
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
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

    // Observe all scroll-fade elements
    const scrollElements = document.querySelectorAll('.scroll-fade');
    scrollElements.forEach(el => observer.observe(el));

    // Parallax effect for background
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = document.body;
        const speed = scrolled * 0.5;
        
        parallax.style.transform = `translateY(${speed}px)`;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // Smooth scroll for better performance
    window.addEventListener('scroll', requestTick);

    // Add wave animation to screenshots
    const screenshots = document.querySelectorAll('.tilted-left');
    screenshots.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'perspective(1000px) rotateY(18deg) scale(1.05)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'perspective(1000px) rotateY(18deg) scale(1)';
        });
    });

    // Ocean wave cursor effect
    document.addEventListener('mousemove', (e) => {
        const cursor = document.querySelector('.wave-cursor');
        if (!cursor) {
            const waveDiv = document.createElement('div');
            waveDiv.className = 'wave-cursor';
            document.body.appendChild(waveDiv);
        }
        
        const wave = document.querySelector('.wave-cursor');
        wave.style.left = e.clientX + 'px';
        wave.style.top = e.clientY + 'px';
    });
});