
const menuIcon = document.querySelector('#menu');
const navLinks = document.querySelector('.links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuIcon.classList.toggle('bx-x');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuIcon.contains(e.target)) {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu after clicking a link
        navLinks.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    });
});

// Active section highlight in navigation
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formProps = Object.fromEntries(formData);
        
        // Show submission feedback
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            contactForm.reset();
            
            // Reset button text after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
            }, 3000);
        }, 1500);
    });
}

// Scroll reveal animation
window.addEventListener('load', () => {
    const revealElements = document.querySelectorAll('.skill-card, .contact-container > *, .about-content > *');
    
    if ('IntersectionObserver' in window) {
        const revealOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealOnScroll.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s ease-out';
            revealOnScroll.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        revealElements.forEach(element => {
            element.classList.add('revealed');
        });
    }
});


// Dynamic text typing effect for the subtitle
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const typing = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, speed);
};

// Apply typing effect to subtitle
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    window.addEventListener('load', () => {
        typeWriter(subtitle, 'Welcome to my Portfolio');
    });
}

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Handle theme preference (if implemented in HTML/CSS)
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.toggle('dark-theme');
} else if (currentTheme === 'light') {
    document.body.classList.toggle('light-theme');
}

// Add custom cursor effect (optional)
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
// Add this to your script.js
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            entry.target.classList.remove('hidden');
        }
    });
}, observerOptions);

// Observe all sections that should animate
document.querySelectorAll('.about-text, .skills-content, .projects-content, .contact-content').forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});
const carousel = document.querySelector('.carousel');
const projectCards = document.querySelectorAll('.project-card');
const prevButton = document.querySelector('.left-arrow');
const nextButton = document.querySelector('.right-arrow');

let currentIndex = 0;
let visibleProjects = calculateVisibleProjects();
const totalProjects = projectCards.length;

// Calculate the number of visible projects based on screen width
function calculateVisibleProjects() {
    if (window.innerWidth > 1024) return 3;
    if (window.innerWidth > 768) return 2;
    return 1;
}

// Update carousel display
function updateCarousel() {
    const cardWidth = carousel.offsetWidth / visibleProjects;
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    projectCards.forEach((card, index) => {
        if (index >= currentIndex && index < currentIndex + visibleProjects) {
            card.classList.add('active');
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        } else {
            card.classList.remove('active');
            card.style.opacity = '0.5';
            card.style.transform = 'scale(0.95)';
        }
    });

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= totalProjects - visibleProjects;
}

// Event listeners for navigation buttons
nextButton.addEventListener('click', () => {
    if (currentIndex < totalProjects - visibleProjects) {
        currentIndex++;
        updateCarousel();
    }
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Touch support for swipe gestures
let touchStartX = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;
    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0 && currentIndex < totalProjects - visibleProjects) {
            currentIndex++;
        } else if (swipeDistance < 0 && currentIndex > 0) {
            currentIndex--;
        }
        updateCarousel();
    }
});

// Handle window resize to recalculate visible projects
window.addEventListener('resize', () => {
    const newVisibleProjects = calculateVisibleProjects();
    if (newVisibleProjects !== visibleProjects) {
        visibleProjects = newVisibleProjects;
        currentIndex = Math.min(currentIndex, totalProjects - visibleProjects);
        updateCarousel();
    }
});

// Initialize the carousel
updateCarousel();
