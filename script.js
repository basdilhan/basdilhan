// ==================== Scroll to Top Button ====================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== Smooth Scroll Navigation ====================
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Intersection Observer for Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation data attributes
document.querySelectorAll('[data-animation]').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== Parallax Effect ====================
const heroSection = document.querySelector('.hero');
const starsElement = document.querySelector('.stars');

window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
        const scrollY = window.scrollY;
        if (heroSection) {
            heroSection.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
        }
        if (starsElement) {
            starsElement.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
    }
});

// ==================== Active Navigation Link ====================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-light)';
        }
    });
});

// ==================== Animated Counter ====================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.ceil(current);
    }, 16);
}

// Observe stat cards for counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const number = parseInt(text);
            if (!isNaN(number)) {
                animateCounter(entry.target, number);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// ==================== Hover Effects for Project Cards ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        projectCards.forEach(c => {
            if (c !== this) {
                c.style.opacity = '0.7';
                c.style.filter = 'blur(2px)';
            }
        });
    });

    card.addEventListener('mouseleave', function() {
        projectCards.forEach(c => {
            c.style.opacity = '1';
            c.style.filter = 'blur(0)';
        });
    });
});

// ==================== Skill Tags Animation ====================
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.05}s`;
});

// ==================== About Cards Stagger Animation ====================
const aboutCards = document.querySelectorAll('.about-card');

aboutCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ==================== Text Animation on Scroll ====================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-title, .hero-text, .contact-subtitle');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// ==================== Mouse Movement Effect ====================
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 10;
    const y = (e.clientY / window.innerHeight) * 10;
    
    document.body.style.setProperty('--mouse-x', `${x}px`);
    document.body.style.setProperty('--mouse-y', `${y}px`);
});

// ==================== Loading Animation ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ==================== Contact Link Animation ====================
const contactLinks = document.querySelectorAll('.contact-link');

contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = link.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
    });
});

// ==================== Page Visibility Animation ====================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '👋 Come back!';
    } else {
        document.title = 'Samudu Dilhan - Full-Stack Developer';
    }
});

// ==================== Initialize AOS-like Behavior ====================
function initializeElementAnimations() {
    const elements = document.querySelectorAll('.fade-in-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            } else {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// ==================== Debounce Function ====================
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

// ==================== Responsive Updates ====================
const handleResize = debounce(() => {
    if (window.innerWidth < 768) {
        // Adjust for mobile
    }
}, 250);

window.addEventListener('resize', handleResize);

// ==================== Initialize on Load ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeElementAnimations();
    revealOnScroll();
    
    // Add stagger animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// ==================== Keyboard Navigation ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy(0, 100);
    } else if (e.key === 'ArrowUp') {
        window.scrollBy(0, -100);
    }
});

// ==================== Performance: Lazy Load Images ====================
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==================== Custom Cursor Movement ====================
const cursorDot = document.createElement('div');
cursorDot.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    display: none;
`;
document.body.appendChild(cursorDot);

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = (mouseX - 4) + 'px';
    cursorDot.style.top = (mouseY - 4) + 'px';
});

// ==================== Console Message ====================
console.log('%c👨‍💻 Welcome to Samudu\'s Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cLooking for an amazing developer? Let\'s connect! 🚀', 'color: #8b5cf6; font-size: 14px;');
console.log('%cEmail: dilhansamudu@gmail.com', 'color: #ec4899; font-size: 12px;');
console.log('%cGitHub: https://github.com/basdilhan', 'color: #10b981; font-size: 12px;');
