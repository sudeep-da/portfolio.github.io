document.addEventListener('DOMContentLoaded', function() {
  // ===== MOBILE MENU TOGGLE =====
  const menuButton = document.querySelector('.hidden button');
  const navList = document.querySelector('nav ul');
  
  if (menuButton) {
    menuButton.addEventListener('click', function() {
      navList.classList.toggle('show');
      const icon = this.querySelector('i');
      icon.classList.toggle('bx-menu');
      icon.classList.toggle('bx-x');
    });
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll('nav ul a').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        navList.classList.remove('show');
        const icon = document.querySelector('.hidden button i');
        if (icon) {
          icon.classList.add('bx-menu');
          icon.classList.remove('bx-x');
        }
      }
    });
  });

  // ===== HIGHLIGHT ACTIVE NAV LINK =====
  function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.toggle('current', link.getAttribute('href') === currentPage);
    });
  }
  
  highlightActiveNav();

  // ===== AUTO-CLOSE MENU ON DESKTOP =====
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      if (navList) navList.classList.remove('show');
      const icon = document.querySelector('.hidden button i');
      if (icon) {
        icon.classList.add('bx-menu');
        icon.classList.remove('bx-x');
      }
    }
  });

  // ===== PROJECT SLIDERS =====
  const sliderState = {};
  
  function initializeSliders() {
    document.querySelectorAll('.slider-container').forEach((slider, index) => {
      const sliderId = slider.id || `slider${index}`;
      sliderState[sliderId] = 0;
      slider.id = sliderId;
    });
  }
  
  function nextSlide(sliderId) {
    const slider = document.getElementById(sliderId);
    const slides = slider.querySelectorAll('.slider-image');
    sliderState[sliderId] = (sliderState[sliderId] + 1) % slides.length;
    updateSlider(sliderId);
  }
  
  function prevSlide(sliderId) {
    const slider = document.getElementById(sliderId);
    const slides = slider.querySelectorAll('.slider-image');
    sliderState[sliderId] = (sliderState[sliderId] - 1 + slides.length) % slides.length;
    updateSlider(sliderId);
  }
  
  function updateSlider(sliderId) {
    const slider = document.getElementById(sliderId);
    slider.style.transform = `translateX(-${sliderState[sliderId] * 100}%)`;
  }
  
  // Initialize sliders if they exist
  if (document.querySelector('.slider-container')) {
    initializeSliders();
    
    // Auto-advance sliders
    setInterval(() => {
      Object.keys(sliderState).forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        if (slider && slider.closest('.project-card:hover') === null) {
          nextSlide(sliderId);
        }
      });
    }, 5000);
  }
});