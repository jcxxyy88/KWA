// Kingsway Academy Website Interactivity

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
    
    // Observe all interactive elements
    document.querySelectorAll('.feature-card, .teacher-card, .tradition-item').forEach(element => {
        observer.observe(element);
    });
    
    // Royal-themed counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const originalText = stat.textContent;
        
        // Only animate if it's a number
        if (/^[\d.,]+%?$/.test(originalText.replace('$', ''))) {
            const isCurrency = originalText.includes('$');
            const isPercentage = originalText.includes('%');
            const cleanText = originalText.replace(/[$,%]/g, '');
            const hasDecimal = cleanText.includes('.');
            
            let targetNumber;
            if (hasDecimal) {
                targetNumber = parseFloat(cleanText);
            } else {
                targetNumber = parseInt(cleanText);
            }
            
            let currentNumber = 0;
            const increment = targetNumber / 30; // Faster animation
            
            const updateNumber = () => {
                if (currentNumber < targetNumber) {
                    currentNumber += increment;
                    
                    if (isCurrency) {
                        stat.textContent = '$' + formatNumber(currentNumber, hasDecimal) + (isPercentage ? '%' : '');
                    } else if (isPercentage) {
                        stat.textContent = formatNumber(currentNumber, hasDecimal) + '%';
                    } else {
                        stat.textContent = formatNumber(currentNumber, hasDecimal);
                    }
                    
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = originalText;
                }
            };
            
            // Helper function to format numbers
            function formatNumber(num, showDecimal) {
                if (showDecimal) {
                    return num.toFixed(1);
                } else {
                    return Math.floor(num).toLocaleString();
                }
            }
            
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
    
    // Royal-themed alert for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#' || this.getAttribute('href') === '') {
                e.preventDefault();
                
                // Create a royal-themed modal instead of alert
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(10, 36, 99, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                `;
                
                modal.innerHTML = `
                    <div style="
                        background: white;
                        padding: 40px;
                        border-radius: 15px;
                        text-align: center;
                        max-width: 500px;
                        width: 90%;
                        border: 5px solid #b8860b;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    ">
                        <i class="fas fa-crown" style="font-size: 3rem; color: #b8860b; margin-bottom: 20px;"></i>
                        <h2 style="color: #0a2463; margin-bottom: 15px;">Hear Ye, Hear Ye!</h2>
                        <p style="margin-bottom: 25px; font-size: 1.1rem;">
                            By royal decree, you have shown interest in Kingsway Academy! 
                            In a real website, this would direct you to our admissions portal.
                        </p>
                        <p style="font-style: italic; color: #666; margin-bottom: 25px;">
                            "Training Children in the King's Way since 1959"
                        </p>
                        <button id="closeModal" style="
                            background: #b8860b;
                            color: #0a2463;
                            border: none;
                            padding: 12px 30px;
                            border-radius: 50px;
                            font-weight: bold;
                            cursor: pointer;
                            font-size: 1rem;
                        ">
                            Continue Your Royal Journey
                        </button>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // Close modal when button is clicked
                document.getElementById('closeModal').addEventListener('click', function() {
                    document.body.removeChild(modal);
                });
                
                // Close modal when clicking outside
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        document.body.removeChild(modal);
                    }
                });
            }
        });
    });
    
    // Update current year in legacy badge if needed
    const currentYear = new Date().getFullYear();
    const foundingYear = 1959;
    const yearsOfExcellence = currentYear - foundingYear;
    
    const legacyYears = document.querySelector('.legacy-years');
    if (legacyYears) {
        legacyYears.textContent = yearsOfExcellence;
    }
    
    // Add subtle animation to crown icons
    const crownIcons = document.querySelectorAll('.crown-icon');
    crownIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add royal flourish to page load
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});
