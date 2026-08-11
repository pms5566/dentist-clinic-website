document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Navbar Scroll Effect ---
  const header = document.querySelector('.navbar-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Hamburger Menu ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
      
      // Update active link highlight
      navLinks.forEach(item => item.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // --- Treatments/Services Tab System ---
  const tabButtons = document.querySelectorAll('.service-tab-btn');
  const servicePanels = document.querySelectorAll('.service-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Update active tab buttons
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Swap active panels
      servicePanels.forEach(panel => {
        panel.classList.remove('active');
        // If it matches target tab
        if (panel.id === `panel-${targetTab}`) {
          panel.classList.add('active');
        }
      });
    });
  });

  // --- Testimonials / Reviews Slider ---
  const slides = document.querySelectorAll('.review-slide');
  const prevBtn = document.getElementById('reviews-prev');
  const nextBtn = document.getElementById('reviews-next');
  let currentSlideIndex = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Boundary check
    if (index >= slides.length) {
      currentSlideIndex = 0;
    } else if (index < 0) {
      currentSlideIndex = slides.length - 1;
    } else {
      currentSlideIndex = index;
    }

    slides[currentSlideIndex].classList.add('active');
  }

  nextBtn.addEventListener('click', () => {
    showSlide(currentSlideIndex + 1);
  });

  prevBtn.addEventListener('click', () => {
    showSlide(currentSlideIndex - 1);
  });

  // Auto-play testimonial slides every 8 seconds
  let slideInterval = setInterval(() => {
    showSlide(currentSlideIndex + 1);
  }, 8000);

  // Clear auto-play when user manually navigates
  const resetSlideTimer = () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      showSlide(currentSlideIndex + 1);
    }, 8000);
  };

  prevBtn.addEventListener('click', resetSlideTimer);
  nextBtn.addEventListener('click', resetSlideTimer);

  // --- FAQ Accordion System ---
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const faqItem = trigger.parentElement;
      const faqContent = faqItem.querySelector('.faq-content');
      const isActive = faqItem.classList.contains('active');

      // Close all other FAQ items for a clean accordion behavior
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-content').style.maxHeight = null;
      });

      // Toggle current FAQ item
      if (!isActive) {
        faqItem.classList.add('active');
        // Set dynamic height for smooth animation
        faqContent.style.maxHeight = faqContent.scrollHeight + 'px';
      }
    });
  });

  // --- Appointment Booking Simulation ---
  const bookingForm = document.getElementById('appointment-form');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal');
  
  // Modal placeholder targets
  const modalUserTarget = document.getElementById('modal-user-name');
  const modalServiceTarget = document.getElementById('modal-service-name');
  const modalDateTarget = document.getElementById('modal-date-val');
  const modalPhoneTarget = document.getElementById('modal-phone-val');

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values
    const nameVal = document.getElementById('form-name').value;
    const phoneVal = document.getElementById('form-phone').value;
    const serviceSelect = document.getElementById('form-service');
    const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
    
    // Format date nicely
    const dateInputVal = document.getElementById('form-date').value;
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateInputVal).toLocaleDateString('en-US', dateOptions);

    // Populate Success Modal Values
    modalUserTarget.textContent = nameVal;
    modalServiceTarget.textContent = serviceText;
    modalDateTarget.textContent = formattedDate;
    modalPhoneTarget.textContent = phoneVal;

    // Show Success Modal
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock scrolling background

    // Reset Form fields
    bookingForm.reset();
  });

  // Close success modal click listener
  closeModalBtn.addEventListener('click', () => {
    successModal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scrolling background
  });

  // Close modal when clicking on overlay background
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      successModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // --- Before/After Makeover Slider Drag Logic ---
  const slider = document.getElementById('before-after-slider');
  const beforeImg = document.getElementById('slider-before-img');
  const handle = document.getElementById('slider-handle');

  if (slider && beforeImg && handle) {
    let isDragging = false;

    const setSliderPosition = (x) => {
      const rect = slider.getBoundingClientRect();
      let position = ((x - rect.left) / rect.width) * 100;
      
      // Keep boundary limits
      if (position < 0) position = 0;
      if (position > 100) position = 100;

      beforeImg.style.width = `${position}%`;
      handle.style.left = `${position}%`;
    };

    // Mouse Events
    handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      e.preventDefault();
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    // Touch Events (Mobile/Tablet)
    handle.addEventListener('touchstart', (e) => {
      isDragging = true;
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches.length > 0) {
        setSliderPosition(e.touches[0].clientX);
      }
    });

    // Allow clicking anywhere on the slider to jump position
    slider.addEventListener('click', (e) => {
      if (e.target !== handle && !handle.contains(e.target)) {
        setSliderPosition(e.clientX);
      }
    });
  }

  // --- Doctor Profiles Bottom Sheet / Popup Trigger ---
  const doctorData = {
    lamia: {
      name: "Dr. Lamia",
      role: "Cosmetic Dentistry Specialist",
      avatar: "images/doctor_lamia.png",
      bio: "Dr. Lamia is an award-winning cosmetic dentist with over 12 years of experience creating healthy, aesthetic smiles. She specializes in veneers, cosmetic bonding, and teeth whitening treatments.",
      education: "DDS - Boston University School of Dental Medicine",
      availability: "Mon, Tue, Thu (09:00 AM - 05:00 PM)"
    },
    ritesh: {
      name: "Dr. Ritesh",
      role: "Preventive Care Specialist",
      avatar: "images/doctor_ritesh.png",
      bio: "Dr. Ritesh focuses on comprehensive dental health, checkups, gum care, and preventive strategies. He has helped over 5,000+ patients maintain strong, decay-free natural teeth.",
      education: "DDS - Columbia University College of Dental Medicine",
      availability: "Mon, Wed, Fri (08:00 AM - 04:00 PM)"
    },
    samon: {
      name: "Dr. Samon",
      role: "Restorative Dentistry Expert",
      avatar: "images/doctor_samon.png",
      bio: "Dr. Samon is our expert in dental implants, porcelain crowns, bridges, and complex root canal therapy. He focuses on rebuilding full bite functionality with pain-free techniques.",
      education: "DDS - NYU College of Dentistry",
      availability: "Tue, Wed, Sat (10:00 AM - 06:00 PM)"
    }
  };

  const doctorButtons = document.querySelectorAll('.view-doctor-btn');
  const doctorOverlay = document.getElementById('doctor-bottom-sheet-overlay');
  const doctorSheetBody = document.getElementById('doctor-sheet-body');
  const doctorCloseBtn = document.getElementById('doctor-sheet-close');

  if (doctorButtons.length > 0 && doctorOverlay && doctorSheetBody && doctorCloseBtn) {
    doctorButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const docId = btn.getAttribute('data-doctor');
        const doc = doctorData[docId];
        if (!doc) return;

        doctorSheetBody.innerHTML = `
          <div class="sheet-doctor-header">
            <img src="${doc.avatar}" alt="${doc.name}" class="sheet-doctor-avatar">
            <div class="sheet-doctor-title">
              <h3>${doc.name}</h3>
              <p>${doc.role}</p>
            </div>
          </div>
          <div class="sheet-doctor-details">
            <div class="details-block">
              <h4>About Specialist</h4>
              <p>${doc.bio}</p>
            </div>
            <div class="details-block">
              <h4>Credentials & Education</h4>
              <p>${doc.education}</p>
            </div>
            <div class="details-block">
              <h4>Availability Info</h4>
              <p>${doc.availability}</p>
            </div>
          </div>
          <a href="#booking" class="btn btn-primary sheet-cta-btn" id="sheet-book-now-btn" style="display: flex; text-decoration: none; justify-content: center; padding: 14px 28px; border-radius: 12px; font-weight: 700; color: white;">Book Consultation with ${doc.name}</a>
        `;

        const innerCta = document.getElementById('sheet-book-now-btn');
        if (innerCta) {
          innerCta.addEventListener('click', () => {
            doctorOverlay.classList.remove('active');
            document.body.style.overflow = '';
          });
        }

        doctorOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    doctorCloseBtn.addEventListener('click', () => {
      doctorOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    doctorOverlay.addEventListener('click', (e) => {
      if (e.target === doctorOverlay) {
        doctorOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

});
