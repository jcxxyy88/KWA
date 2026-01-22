// Kingsway Academy - Clean Website Interactivity

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
    
    // Simple fade-in animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Set initial state for animation
    document.querySelectorAll('.feature-card, .teacher-card, .tradition-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
    
    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const originalText = stat.textContent;
        
        // Only animate if it's a number
        if (/^[\d.,]+%?$/.test(originalText.replace('$', '').replace('+', ''))) {
            const isCurrency = originalText.includes('$');
            const isPercentage = originalText.includes('%');
            const hasPlus = originalText.includes('+');
            const cleanText = originalText.replace(/[$,%+]/g, '');
            const hasDecimal = cleanText.includes('.');
            
            let targetNumber;
            if (hasDecimal) {
                targetNumber = parseFloat(cleanText);
            } else {
                targetNumber = parseInt(cleanText);
            }
            
            let currentNumber = 0;
            const increment = targetNumber / 25;
            
            const updateNumber = () => {
                if (currentNumber < targetNumber) {
                    currentNumber += increment;
                    
                    let formattedNumber;
                    if (hasDecimal) {
                        formattedNumber = currentNumber.toFixed(1);
                    } else {
                        formattedNumber = Math.floor(currentNumber).toLocaleString();
                    }
                    
                    if (isCurrency) {
                        stat.textContent = '$' + formattedNumber + (hasPlus ? '+' : '') + (isPercentage ? '%' : '');
                    } else if (isPercentage) {
                        stat.textContent = formattedNumber + '%';
                    } else if (hasPlus) {
                        stat.textContent = formattedNumber + '+';
                    } else {
                        stat.textContent = formattedNumber;
                    }
                    
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
    
    // Simple alert for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#' || this.getAttribute('href') === '') {
                e.preventDefault();
                alert('Thank you for your interest in Kingsway Academy! In a real website, this would direct you to our admissions portal.');
            }
        });
    });
    
    // Update current year in legacy badge
    const legacyYears = document.querySelector('.legacy-years');
    if (legacyYears) {
        // Fixed to 67 years (1959-2026)
        legacyYears.textContent = '67';
    }
    
    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'var(--shadow)';
        });
    });
});
