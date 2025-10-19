// Projects Display JavaScript - No Slideshow

// Initialize projects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProjects();
});

// Initialize static project display
function initializeProjects() {
    // Show all projects as static content
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.add('active');
    });
    
    // Remove any slideshow-specific elements if they exist
    const indicators = document.querySelector('.slide-indicators');
    const navArrows = document.querySelectorAll('.nav-arrow');
    
    if (indicators) {
        indicators.style.display = 'none';
    }
    
    navArrows.forEach(arrow => {
        arrow.style.display = 'none';
    });
    
    console.log('Projects initialized - slideshow effects removed');
}

// Performance optimization: Preload images
function preloadImages() {
    const images = document.querySelectorAll('.project-image img');
    images.forEach(img => {
        const imageUrl = img.src;
        const image = new Image();
        image.src = imageUrl;
    });
}

// Call preload function when page loads
window.addEventListener('load', preloadImages);