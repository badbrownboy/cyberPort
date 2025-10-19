// Typewriter animation for hero subtitle (repeats)
document.addEventListener('DOMContentLoaded', function() {
  const text = "Security Analyst and IT Specialist skilled in troubleshooting, networking, and cybersecurity basics.";
  const el = document.getElementById('typewriter');
  let i = 0;
  let forward = true;
  function type() {
    if (forward) {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(type, 40);
      } else {
        forward = false;
        setTimeout(type, 1200);
      }
    } else {
      if (i >= 0) {
        el.textContent = text.slice(0, i);
        i--;
        setTimeout(type, 18);
      } else {
        forward = true;
        setTimeout(type, 600);
      }
    }
  }
  type();
});
