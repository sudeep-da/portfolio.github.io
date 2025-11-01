// ===== GLOBAL VARIABLES =====
let currentCertificateIndex = 0;
let currentInternshipIndex = 0;

// Certificate images array - MUST MATCH THE ORDER IN HTML onclick indices
const certificateImages = [
    "Certificates/C_N.jpg",                     // 0 - Computer Networks
    "Certificates/Web Development_certificate.jpg", // 1 - Web Development
    "Certificates/Full-Stack.jpg",              // 2 - Full-Stack
    "Certificates/HTML.jpg",                    // 3 - HTML
    "Certificates/Javascript_Bootcamp.jpg",     // 4 - JavaScript Bootcamp
    "Certificates/React_Bootcamp.jpg",          // 5 - React Bootcamp
    "Certificates/Javascript.jpg",              // 6 - Javascript for Web Designers
    "Certificates/Front-End.jpg",               // 7 - Front-End .NET
    "Certificates/Back-End.jpg",                // 8 - Back-End .NET
    "Certificates/PHP.jpg",                     // 9 - PHP
    "Certificates/MySQL.jpg",                   // 10 - MySQL
    "Certificates/Github2.jpg",                 // 11 - Github Copilot Professional
    "Certificates/Github_Bootcamp.jpg",         // 12 - Git & Github Bootcamp
    "Certificates/Q_A_B.jpg",                   // 13 - Quantitative Aptitude
    "Certificates/S_S_I.jpg"                    // 14 - Soft Skills
];

// Certificate titles array - MUST MATCH THE ORDER IN HTML onclick indices
const certificateTitles = [
    "Computer Networks Certification Course", // 0
    "Web Development", // 1
    "Full-Stack Development Level-1 Training Program", // 2
    "Introduction to HTML", // 3
    "JavaScript Bootcamp", // 4
    "React Bootcamp", // 5
    "Javascript for Web Designers", // 6
    "Front-End Web Development with .NET", // 7
    "Back-End Web Development with .NET", // 8
    "Get Started with PHP", // 9
    "Advance MySQL", // 10
    "Career Essentials in Github Copilot Professional Certificate", // 11
    "Git & Github Bootcamp", // 12
    "Quantitative Aptitude Basics", // 13
    "Soft Skills for IT" // 14
];

// Internship images array
const internshipImages = [
    "Internship/Codsoft.jpg",
    "Internship/Leosias.jpg"
];

// Internship titles array
const internshipTitles = [
    "CodSoft Internship Certificate",
    "Leosias Internship Certificate"
];

// Track current section for fullscreen navigation
let currentSection = 'certificates'; // 'certificates' or 'internships'

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeFullscreenViewers();
    initializeSmoothScrolling();
    initializeButtonLoading();
    initializeLazyLoading();
    initializePageTransitions();
    ensureFullscreenElementsExist();
    initializeContactForm(); // Added contact form initialization
});

// ===== CONTACT FORM SECTION =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData();
            formData.append('name', document.getElementById('name').value);
            formData.append('email', document.getElementById('email').value);
            formData.append('message', document.getElementById('message').value);
            formData.append('_captcha', 'false');
            formData.append('_template', 'table');
            
            // Submit to FormSubmit
            fetch('https://formsubmit.co/ajax/ashtekardsudeep@gmail.com', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Redirect to thank you page regardless of success
                window.location.href = 'thankyou.html';
            })
            .catch(error => {
                console.error('Error:', error);
                // Still redirect to thank you page even if there's an error
                window.location.href = 'thankyou.html';
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
}

// ===== NAVIGATION SECTION =====
function initializeNavigation() {
    const menuButton = document.querySelector('.hidden button');
    const navList = document.querySelector('nav ul');
    
    // Mobile menu toggle
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            navList.classList.toggle('show');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('bx-menu');
                icon.classList.toggle('bx-x');
            }
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav ul a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });

    // Highlight active nav link
    highlightActiveNav();

    // Auto-close menu on desktop resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const navList = document.querySelector('nav ul');
    const icon = document.querySelector('.hidden button i');
    
    if (navList) navList.classList.remove('show');
    if (icon) {
        icon.classList.add('bx-menu');
        icon.classList.remove('bx-x');
    }
}

function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.toggle('current', link.getAttribute('href') === currentPage);
    });
}

// ===== FULLSCREEN VIEWERS SECTION =====
function initializeFullscreenViewers() {
    // ESC key to close fullscreen
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeFullscreen();
        }
        
        // Arrow key navigation (only for certificates)
        if (currentSection === 'certificates') {
            if (event.key === 'ArrowLeft') {
                navigateFullscreen(-1, event);
            } else if (event.key === 'ArrowRight') {
                navigateFullscreen(1, event);
            }
        }
    });
}

// Ensure fullscreen elements exist and are properly structured
function ensureFullscreenElementsExist() {
    let fullscreenContainer = document.getElementById('fullscreen-container');
    
    // Create fullscreen container if it doesn't exist
    if (!fullscreenContainer) {
        fullscreenContainer = document.createElement('div');
        fullscreenContainer.id = 'fullscreen-container';
        fullscreenContainer.className = 'fullscreen-container';
        document.body.appendChild(fullscreenContainer);
        
        // Create image element
        const fullscreenImage = document.createElement('img');
        fullscreenImage.id = 'fullscreen-image';
        fullscreenImage.className = 'fullscreen-image';
        fullscreenContainer.appendChild(fullscreenImage);
        
        // Create navigation container
        const navContainer = document.createElement('div');
        navContainer.className = 'fullscreen-nav';
        fullscreenContainer.appendChild(navContainer);
        
        // Create navigation arrows
        const leftArrow = document.createElement('button');
        leftArrow.className = 'fullscreen-arrow fullscreen-arrow-left';
        leftArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
        leftArrow.setAttribute('aria-label', 'Previous image');
        leftArrow.onclick = (e) => {
            e.stopPropagation();
            navigateFullscreen(-1, e);
        };
        
        const rightArrow = document.createElement('button');
        rightArrow.className = 'fullscreen-arrow fullscreen-arrow-right';
        rightArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
        rightArrow.setAttribute('aria-label', 'Next image');
        rightArrow.onclick = (e) => {
            e.stopPropagation();
            navigateFullscreen(1, e);
        };
        
        navContainer.appendChild(leftArrow);
        navContainer.appendChild(rightArrow);
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.id = 'fullscreen-close-btn';
        closeButton.className = 'fullscreen-close-btn';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.setAttribute('aria-label', 'Close fullscreen');
        closeButton.onclick = closeFullscreen;
        fullscreenContainer.appendChild(closeButton);
        
        // Add hover effects
        addFullscreenHoverEffects();
    } else {
        // If container exists, ensure all elements are present
        ensureCloseButtonExists();
        ensureNavigationArrowsExist();
    }
}

function ensureCloseButtonExists() {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    if (!fullscreenContainer) return;
    
    let closeButton = document.getElementById('fullscreen-close-btn');
    
    if (!closeButton) {
        closeButton = document.createElement('button');
        closeButton.id = 'fullscreen-close-btn';
        closeButton.className = 'fullscreen-close-btn';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.setAttribute('aria-label', 'Close fullscreen');
        closeButton.onclick = closeFullscreen;
        fullscreenContainer.appendChild(closeButton);
    }
    
    addFullscreenHoverEffects();
}

function ensureNavigationArrowsExist() {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    if (!fullscreenContainer) return;
    
    let navContainer = fullscreenContainer.querySelector('.fullscreen-nav');
    
    if (!navContainer) {
        navContainer = document.createElement('div');
        navContainer.className = 'fullscreen-nav';
        
        // Create left arrow
        const leftArrow = document.createElement('button');
        leftArrow.className = 'fullscreen-arrow fullscreen-arrow-left';
        leftArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
        leftArrow.setAttribute('aria-label', 'Previous image');
        leftArrow.onclick = (e) => {
            e.stopPropagation();
            navigateFullscreen(-1, e);
        };
        
        // Create right arrow
        const rightArrow = document.createElement('button');
        rightArrow.className = 'fullscreen-arrow fullscreen-arrow-right';
        rightArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
        rightArrow.setAttribute('aria-label', 'Next image');
        rightArrow.onclick = (e) => {
            e.stopPropagation();
            navigateFullscreen(1, e);
        };
        
        navContainer.appendChild(leftArrow);
        navContainer.appendChild(rightArrow);
        fullscreenContainer.appendChild(navContainer);
    }
}

function addFullscreenHoverEffects() {
    const closeButton = document.getElementById('fullscreen-close-btn');
    const arrows = document.querySelectorAll('.fullscreen-arrow');
    
    if (closeButton) {
        closeButton.onmouseenter = function() {
            this.style.background = 'rgba(233, 183, 86, 1)';
            this.style.transform = 'scale(1.1)';
        };
        closeButton.onmouseleave = function() {
            this.style.background = 'rgba(233, 183, 86, 0.9)';
            this.style.transform = 'scale(1)';
        };
    }
    
    arrows.forEach(arrow => {
        arrow.onmouseenter = function() {
            this.style.background = 'rgba(233, 183, 86, 1)';
            this.style.transform = 'scale(1.1)';
        };
        arrow.onmouseleave = function() {
            this.style.background = 'rgba(233, 183, 86, 0.8)';
            this.style.transform = 'scale(1)';
        };
    });
}

// CERTIFICATES FULLSCREEN FUNCTIONS
function openFullscreen(imgElement, index) {
    console.log('Opening fullscreen with index:', index);
    console.log('Total certificates:', certificateImages.length);
    
    currentCertificateIndex = index;
    currentSection = 'certificates';
    const fullscreenContainer = document.getElementById('fullscreen-container');
    const fullscreenImage = document.getElementById('fullscreen-image');
    
    if (fullscreenContainer && fullscreenImage) {
        // Check if the index is valid
        if (currentCertificateIndex >= 0 && currentCertificateIndex < certificateImages.length) {
            fullscreenImage.src = certificateImages[currentCertificateIndex];
            fullscreenImage.alt = certificateTitles[currentCertificateIndex];
            fullscreenContainer.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Show navigation arrows for certificates
            showFullscreenNavigation(true);
            
            console.log('Displaying:', certificateTitles[currentCertificateIndex]);
        } else {
            console.error('Invalid certificate index:', currentCertificateIndex);
        }
    } else {
        console.error('Fullscreen container or image element not found');
    }
}

// INTERNSHIP FULLSCREEN FUNCTIONS
function openInternshipFullscreen(imgElement, index) {
    console.log('Opening internship fullscreen with index:', index);
    console.log('Total internships:', internshipImages.length);
    
    currentInternshipIndex = index;
    currentSection = 'internships';
    const fullscreenContainer = document.getElementById('fullscreen-container');
    const fullscreenImage = document.getElementById('fullscreen-image');
    
    if (fullscreenContainer && fullscreenImage) {
        // Check if the index is valid
        if (currentInternshipIndex >= 0 && currentInternshipIndex < internshipImages.length) {
            fullscreenImage.src = internshipImages[currentInternshipIndex];
            fullscreenImage.alt = internshipTitles[currentInternshipIndex];
            fullscreenContainer.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Hide navigation arrows for internships (only show close button)
            showFullscreenNavigation(false);
            
            console.log('Displaying internship:', internshipTitles[currentInternshipIndex]);
        } else {
            console.error('Invalid internship index:', currentInternshipIndex);
        }
    } else {
        console.error('Fullscreen container or image element not found');
    }
}

function navigateFullscreen(direction, event) {
    if (event) event.stopPropagation();
    
    if (currentSection === 'certificates') {
        // Navigate certificates
        currentCertificateIndex += direction;
        
        // Wrap around if at beginning or end
        if (currentCertificateIndex < 0) {
            currentCertificateIndex = certificateImages.length - 1;
        } else if (currentCertificateIndex >= certificateImages.length) {
            currentCertificateIndex = 0;
        }
        
        console.log('Navigating certificates to index:', currentCertificateIndex);
        
        const fullscreenImage = document.getElementById('fullscreen-image');
        if (fullscreenImage) {
            fullscreenImage.src = certificateImages[currentCertificateIndex];
            fullscreenImage.alt = certificateTitles[currentCertificateIndex];
            console.log('Now displaying certificate:', certificateTitles[currentCertificateIndex]);
        }
    }
    // Note: No navigation for internships - arrows are hidden
}

// Show/hide navigation arrows
function showFullscreenNavigation(show) {
    const fullscreenNav = document.querySelector('.fullscreen-nav');
    if (fullscreenNav) {
        fullscreenNav.style.display = show ? 'flex' : 'none';
    }
}

// Close fullscreen viewer
function closeFullscreen(event) {
    // Prevent event propagation if called from button
    if (event) {
        event.stopPropagation();
    }
    
    const fullscreenContainer = document.getElementById('fullscreen-container');
    if (fullscreenContainer) {
        fullscreenContainer.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===== PAGE TRANSITIONS =====
function initializePageTransitions() {
    const transition = document.querySelector('.page-transition');
    
    // Show transition on page load
    if (transition) {
        transition.style.opacity = '1';
        setTimeout(() => {
            transition.style.opacity = '0';
        }, 300);
    }
    
    // Add transition to all internal links
    document.querySelectorAll('a[href^=""]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply to internal links
            if (href && !href.startsWith('http') && !href.startsWith('#') && href !== '') {
                e.preventDefault();
                
                if (transition) {
                    transition.style.opacity = '1';
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                } else {
                    window.location.href = href;
                }
            }
        });
    });
}

// ===== SMOOTH SCROLLING SECTION =====
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===== BUTTON LOADING STATES SECTION =====
function initializeButtonLoading() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit' || this.closest('a')) {
                this.style.opacity = '0.7';
                this.style.cursor = 'wait';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.cursor = 'pointer';
                }, 2000);
            }
        });
    });
}

// ===== LAZY LOADING SECTION =====
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }
}

// ===== UTILITY FUNCTIONS =====
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

// Export functions for global access
window.openFullscreen = openFullscreen;
window.openInternshipFullscreen = openInternshipFullscreen;
window.closeFullscreen = closeFullscreen;
window.navigateFullscreen = navigateFullscreen;