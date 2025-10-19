// about.js

function handleScrollFadeIn() {
  const fadeEls = document.querySelectorAll('.fade-in');
  const triggerBottom = window.innerHeight * 0.85;

  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', handleScrollFadeIn);
document.addEventListener('DOMContentLoaded', function() {
  handleScrollFadeIn();
  var aboutTitle = document.querySelector('.about-title-centered');
  if (aboutTitle) {
    setTimeout(function() {
      aboutTitle.classList.add('underline-animate');
    }, 200);
  }
  var flipCard = document.getElementById('flipCard');
  var flipArrow = document.getElementById('flipArrow');
  var flipBack = document.getElementById('flipBack');
  if (flipArrow && flipCard) {
    flipArrow.addEventListener('click', function() {
      flipCard.classList.add('flipped');
    });
  }
  if (flipBack && flipCard) {
    flipBack.addEventListener('click', function() {
      flipCard.classList.remove('flipped');
    });
  }
});
