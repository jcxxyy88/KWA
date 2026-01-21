// Simple JavaScript for interactive elements

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add animation to feature cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe feature cards and teacher cards
    document.querySelectorAll('.feature-card, .teacher-card').forEach(card => {
        observer.observe(card);
    });
    
    // Simple counter animation for stats (for presentation effect)
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const originalText = stat.textContent;
        
        // Only animate if it's a number
        if (/^\d+%?$/.test(originalText)) {
            const targetNumber = parseInt(originalText);
            let currentNumber = 0;
            const increment = targetNumber / 50; // Takes about 1 second at 50 frames
            
            const updateNumber = () => {
                if (currentNumber < targetNumber) {
                    currentNumber += increment;
                    stat.textContent = Math.floor(currentNumber) + (originalText.includes('%') ? '%' : '');
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = originalText;
                }
            };
            
            // Start animation when stat comes into view
            const statObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateNumber();
                    statObserver.unobserve(stat);
                }
            }, { threshold: 0.5 });
            
            statObserver.observe(stat);
        }
    });
    
    // Add click event to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Thank you for your interest in Excel Academy! In a real website, this would redirect to a tour scheduling form.');
            }
        });
    });
    
    // Update year in footer if needed
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
});
