document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const openIcon = mobileMenuButton ? mobileMenuButton.querySelector('.menu-icon-open') : null;
  const closeIcon = mobileMenuButton ? mobileMenuButton.querySelector('.menu-icon-close') : null;

  if (mobileMenuButton && mobileMenu && openIcon && closeIcon) {
    mobileMenuButton.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('hidden');
      mobileMenuButton.setAttribute('aria-expanded', !isOpen);
      openIcon.style.display = isOpen ? 'block' : 'none';
      closeIcon.style.display = isOpen ? 'none' : 'block';
    });

    // Close mobile menu on link click
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        openIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      });
    });
  }

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');

      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields.");
        return;
      }
      
      console.log('Form data submitted:', { 
        name: name.toString(), 
        email: email.toString(), 
        subject: subject.toString(), 
        message: message.toString() 
      });
      
      contactForm.style.display = 'none';
      formFeedback.classList.remove('hidden');
      formFeedback.innerHTML = `
        <div class="text-center py-8">
          <h3 class="text-xl font-semibold text-green-400">Thank You!</h3>
          <p class="text-brand-text mt-2">Your message has been sent successfully. We'll get back to you soon.</p>
        </div>
      `;
      (contactForm as HTMLFormElement).reset();
      
      setTimeout(() => {
        formFeedback.classList.add('hidden');
        formFeedback.innerHTML = ''; // Clear content
        contactForm.style.display = 'block';
      }, 3000);
    });
  }

  // Active navigation link highlighting
  const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
  
  const desktopNavLinks = document.querySelectorAll('nav div.hidden.md\\:block a[data-navlink]');
  desktopNavLinks.forEach(link => {
    const linkPath = link.getAttribute('data-navlink');
    if (linkPath === currentLocation) {
      link.classList.add('active-nav-link');
      link.classList.remove('inactive-nav-link');
    } else {
      link.classList.add('inactive-nav-link');
      link.classList.remove('active-nav-link');
    }
  });

  const mobileNavLinks = document.querySelectorAll('#mobile-menu a[data-navlink-mobile]');
  mobileNavLinks.forEach(link => {
    const linkPath = link.getAttribute('data-navlink-mobile');
     if (linkPath === currentLocation) {
      link.classList.add('active-nav-link');
      link.classList.remove('inactive-nav-link');
    } else {
      link.classList.add('inactive-nav-link');
      link.classList.remove('active-nav-link');
    }
  });


  // Footer: Current Year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

});

// Global function for product details alert (example)
function showProductDetails(productName) {
  alert(`More details for ${productName}`);
}
// Expose to global scope if not already
window.showProductDetails = showProductDetails;
