const galleryImages = [
  { src: "images/gallery1.jpg", alt: "Aerial of housing and golf course" },
  { src: "images/gallery2.jpg", alt: "Pool and backyard" },
  { src: "images/gallery3.jpg", alt: "Living room with scenic window views" },
  { src: "images/gallery4.jpg", alt: "Another aerial of residential area and ponds" }
];

const galleryMainImg = document.getElementById("gallery-main-img");
const thumbs = document.querySelectorAll(".gallery-thumbnails .thumb");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

let currentIndex = 0;

// Updates gallery main image and thumbnail highlights
function updateGallery(index) {
  if (index < 0) {
    index = galleryImages.length - 1;
  } else if (index >= galleryImages.length) {
    index = 0;
  }

  // fade out current image
  galleryMainImg.style.opacity = '0';

  currentIndex = index;

  setTimeout(() => {
    galleryMainImg.src = galleryImages[currentIndex].src;
    galleryMainImg.alt = galleryImages[currentIndex].alt;
    galleryMainImg.style.opacity = '1';
  }, 300);

  thumbs.forEach((thumb, idx) => {
    if (idx === currentIndex) {
      thumb.classList.add("active");
      thumb.setAttribute("aria-current", "true");
      thumb.setAttribute("tabindex", "0");
    } else {
      thumb.classList.remove("active");
      thumb.removeAttribute("aria-current");
      thumb.setAttribute("tabindex", "-1");
    }
  });
}

// Initialize gallery on page load
updateGallery(0);

// Previous and Next button event handlers
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    updateGallery(currentIndex + 1);
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    updateGallery(currentIndex - 1);
  });
}

// Thumbnail click and keyboard interaction for accessibility
thumbs.forEach((thumb, idx) => {
  thumb.addEventListener("click", () => {
    updateGallery(idx);
  });
  thumb.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      updateGallery(idx);
    }
  });
});

// Navigation toggle for mobile menu
const menuToggleBtn = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggleBtn) {
  menuToggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close menu on navigation link click
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

// Enable/Disable Search Now button depending on form input
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".listing-form");
  const searchBtn = form.querySelector(".search-btn");
  const inputs = form.querySelectorAll("select, input");

  function updateSearchButtonState() {
    let enabled = false;
    inputs.forEach(input => {
      if (input.value.trim() !== "") {
        enabled = true;
      }
    });
    if (enabled) {
      searchBtn.disabled = false;
      searchBtn.classList.add("enabled");
      searchBtn.setAttribute("aria-disabled", "false");
    } else {
      searchBtn.disabled = true;
      searchBtn.classList.remove("enabled");
      searchBtn.setAttribute("aria-disabled", "true");
    }
  }

  inputs.forEach(input => {
    input.addEventListener("input", updateSearchButtonState);
    input.addEventListener("change", updateSearchButtonState);
  });

  updateSearchButtonState();

  // action on form submit
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!searchBtn.disabled) {
      alert("Search initiated with your selected criteria.");
      // implement a logic pag need
    }
  });
});
