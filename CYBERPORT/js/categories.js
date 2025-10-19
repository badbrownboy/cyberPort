// Parallax Scroll Effect for Skills/Categories Section
class ParallaxSkills {
  constructor() {
    this.skillsContainer = document.querySelector('.skills-pages');
    this.categoryPages = document.querySelectorAll('.category-page');
    this.isScrolling = false;
    this.init();
  }

  init() {
    if (!this.skillsContainer) return;
    
    // Add scroll event listener with throttling for better performance
    this.skillsContainer.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 10));
    
    // Initialize intersection observer for section visibility
    this.setupIntersectionObserver();
    
    // Add resize listener
    window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 250));
  }

  handleScroll() {
    if (window.innerWidth <= 900) return; // Disable on mobile for performance
    
    const scrollTop = this.skillsContainer.scrollTop;
    const containerHeight = this.skillsContainer.clientHeight;
    
    this.categoryPages.forEach((page, index) => {
      const pageTop = page.offsetTop;
      const pageHeight = page.offsetHeight;
      const pageCenter = pageTop + pageHeight / 2;
      const distanceFromCenter = scrollTop + containerHeight / 2 - pageCenter;
      const normalizedDistance = distanceFromCenter / containerHeight;
      
      this.applyParallaxEffects(page, normalizedDistance, scrollTop, pageTop);
    });
  }

  applyParallaxEffects(page, normalizedDistance, scrollTop, pageTop) {
    const category = page.querySelector('.category');
    const categoryLogo = page.querySelector('.category-logo');
    const categoryDetails = page.querySelector('.category-details');
    const categoryTitle = page.querySelector('.category h2');
    const backgroundBefore = page;
    
    // Calculate parallax offsets with different speeds for layered effect
    const slowParallax = normalizedDistance * 30;
    const mediumParallax = normalizedDistance * 50;
    const fastParallax = normalizedDistance * 80;
    const rotationEffect = normalizedDistance * 2;
    
    // Apply background parallax (slowest layer)
    if (backgroundBefore) {
      backgroundBefore.style.setProperty('--bg-offset', `${slowParallax}px`);
      page.style.setProperty('transform', 
        `translate3d(0, ${slowParallax * 0.3}px, 0)`
      );
    }
    
    // Apply category container parallax
    if (category) {
      category.style.transform = 
        `translate3d(${mediumParallax * 0.1}px, ${mediumParallax * 0.3}px, 0) 
         rotateY(${rotationEffect * 0.5}deg)`;
    }
    
    // Apply logo parallax (medium speed)
    if (categoryLogo) {
      categoryLogo.style.transform = 
        `translate3d(${mediumParallax * -0.2}px, ${mediumParallax * 0.4}px, 0) 
         rotateX(${rotationEffect}deg)`;
      
      // Individual logo images with staggered effects
      const logoImages = categoryLogo.querySelectorAll('img');
      logoImages.forEach((img, index) => {
        const stagger = index * 5;
        img.style.transform = 
          `translate3d(0, ${(mediumParallax * 0.5) + stagger}px, 0) 
           rotateZ(${rotationEffect * 0.3}deg)`;
      });
    }
    
    // Apply details parallax (faster speed)
    if (categoryDetails) {
      categoryDetails.style.transform = 
        `translate3d(${fastParallax * 0.1}px, ${fastParallax * -0.2}px, 0)`;
      
      // Animate proficiency bars
      const proficiencyBars = categoryDetails.querySelectorAll('.proficiency');
      proficiencyBars.forEach((bar, index) => {
        const stagger = index * 3;
        bar.style.transform = 
          `translate3d(${(fastParallax * 0.05) + stagger}px, 0, 0)`;
      });
    }
    
    // Apply title parallax with 3D effect
    if (categoryTitle) {
      categoryTitle.style.transform = 
        `translate3d(${mediumParallax * -0.1}px, ${mediumParallax * 0.2}px, 0) 
         rotateY(${rotationEffect * -0.8}deg) 
         rotateX(${rotationEffect * 0.3}deg)`;
    }
    
    // Apply CSS custom properties for background effects
    page.style.setProperty('--parallax-y', `${slowParallax}px`);
    page.style.setProperty('--parallax-rotation', `${rotationEffect}deg`);
  }

  setupIntersectionObserver() {
    const options = {
      root: this.skillsContainer,
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const page = entry.target;
        const category = page.querySelector('.category');
        
        if (entry.isIntersecting) {
          // Add visible class for animations
          page.classList.add('is-visible');
          
          // Trigger proficiency bar animations
          const proficiencyBars = page.querySelectorAll('.proficiency-bar');
          proficiencyBars.forEach((bar, index) => {
            setTimeout(() => {
              bar.style.animationPlayState = 'running';
            }, index * 100);
          });
        } else {
          page.classList.remove('is-visible');
        }
      });
    }, options);

    this.categoryPages.forEach(page => {
      observer.observe(page);
    });
  }

  handleResize() {
    // Reset transforms on resize
    this.categoryPages.forEach(page => {
      if (window.innerWidth <= 900) {
        this.resetTransforms(page);
      }
    });
  }

  resetTransforms(page) {
    const elements = page.querySelectorAll('.category, .category-logo, .category-details, .category h2, .category-logo img, .proficiency');
    elements.forEach(el => {
      el.style.transform = '';
    });
  }

  // Throttle function for performance
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
}

// Enhanced CSS animations via JavaScript
const enhancedCSS = `
  .category-page::before {
    transform: translate3d(0, var(--parallax-y, 0px), 0) rotate(var(--parallax-rotation, 0deg));
  }
  
  .category-page::after {
    transform: translate3d(0, calc(var(--parallax-y, 0px) * -0.5), 0) rotate(calc(var(--parallax-rotation, 0deg) * -0.3));
  }
  
  .category-page.is-visible .category-logo img {
    animation-play-state: running;
  }
  
  .category-page:not(.is-visible) .category-logo img {
    animation-play-state: paused;
  }
`;

// Inject enhanced CSS
const style = document.createElement('style');
style.textContent = enhancedCSS;
document.head.appendChild(style);

// Initialize parallax when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ParallaxSkills();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ParallaxSkills();
  });
} else {
  new ParallaxSkills();
}