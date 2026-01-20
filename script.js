/* ========================================
   KATACHI Studio - JavaScript
   ======================================== */

// Product Data
const productsData = [
  {
    id: "1",
    name: "Verde Modular Chair",
    price: "€4,890",
    image: "/green-velvet-modular-chair.png",
    badge: "New",
    materials: ["Copper Frame", "Premium Velvet"],
    swatches: [
      { name: "Forest Green", color: "#355E3B" },
      { name: "Sage Green", color: "#9CAF88" },
      { name: "Copper", color: "#B87333" },
    ],
    quickLookImages: [
      "/green-velvet-modular-chair.png",
      "/green-velvet-modular-chair.png",
      "/green-velvet-modular-chair.png",
    ],
    dimensions: "W: 180cm × D: 90cm × H: 75cm",
  },
  {
    id: "2",
    name: "Terracotta Cloud Chair",
    price: "€5,250",
    image: "/terracotta-cloud-chair.png",
    badge: "New",
    materials: ["Copper Frame", "Terracotta Velvet"],
    swatches: [
      { name: "Terracotta", color: "#E2725B" },
      { name: "Burnt Orange", color: "#CC5500" },
      { name: "Copper", color: "#B87333" },
    ],
    quickLookImages: [
      "/terracotta-cloud-chair.png",
      "/terracotta-cloud-chair.png",
      "/terracotta-cloud-chair.png",
    ],
    dimensions: "W: 95cm × D: 85cm × H: 80cm",
  },
  {
    id: "3",
    name: "Sage Copper Lounge",
    price: "€4,675",
    image: "/sage-copper-lounge-chair.png",
    badge: "Limited",
    materials: ["Copper Frame", "Sage Velvet"],
    swatches: [
      { name: "Sage Green", color: "#9CAF88" },
      { name: "Forest Green", color: "#355E3B" },
      { name: "Copper", color: "#B87333" },
    ],
    quickLookImages: [
      "/sage-copper-lounge-chair.png",
      "/sage-copper-lounge-chair.png",
      "/sage-copper-lounge-chair.png",
    ],
    dimensions: "W: 85cm × D: 90cm × H: 75cm",
  },
];

// DOM Elements
const header = document.getElementById("header");
const heroSection = document.getElementById("hero");
const collectionsTrack = document.getElementById("collectionsTrack");
const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("emailInput");
const errorMessage = document.getElementById("errorMessage");
const newsletterSuccess = document.getElementById("newsletterSuccess");
const materialBtns = document.querySelectorAll(".material-btn");
const materialBgs = document.querySelectorAll(".material-bg");
const materialTitle = document.getElementById("materialTitle");
const quickLookModal = document.getElementById("quickLookModal");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.querySelector(".modal-backdrop");
const productCards = document.querySelectorAll(".product-card");
const currentYearEl = document.getElementById("currentYear");

// State
let currentProduct = null;
let currentImageIndex = 0;
let selectedSwatchIndex = 0;
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initHeroParallax();
  initRevealAnimations();
  initCollectionsCarousel();
  initMaterialsSection();
  initNewsletterForm();
  initProductCards();
  initModal();
  initCurrentYear();
  animateHeroText();
});

// Header scroll effect
function initHeader() {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Hero parallax effect
function initHeroParallax() {
  const heroBackground = document.querySelector(".hero-background");
  const heroContent = document.querySelector(".hero-content");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight;

    if (scrollY < heroHeight) {
      const progress = scrollY / heroHeight;

      // Scale and translate background
      const scale = 1 + progress * 0.05;
      const translateY = -scrollY * 0.05;
      heroBackground.style.transform = `scale(${scale}) translateY(${translateY}px)`;

      // Fade and move content
      const contentOpacity = 1 - progress * 2;
      const contentTranslateY = scrollY * 0.3;
      heroContent.style.opacity = Math.max(0, contentOpacity);
      heroContent.style.transform = `translateY(${contentTranslateY}px)`;
    }
  });
}

// Animate hero text character by character
function animateHeroText() {
  const titleLines = document.querySelectorAll(".title-line");

  titleLines.forEach((line, lineIndex) => {
    const text = line.textContent;
    line.textContent = "";

    const baseDelay = lineIndex === 0 ? 500 : 1100;

    [...text].forEach((char, charIndex) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = char === " " ? "inline" : "inline-block";
      span.style.animationDelay = `${baseDelay + charIndex * 30}ms`;
      line.appendChild(span);
    });
  });
}

// Reveal animations on scroll
function initRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "-50px",
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// Collections carousel drag functionality
function initCollectionsCarousel() {
  let isDown = false;
  let startX;
  let scrollPosition = 0;
  let currentX = 0;

  collectionsTrack.addEventListener("mousedown", (e) => {
    isDown = true;
    collectionsTrack.classList.add("active");
    startX = e.pageX;
    collectionsTrack.style.cursor = "grabbing";
  });

  collectionsTrack.addEventListener("mouseleave", () => {
    isDown = false;
    collectionsTrack.style.cursor = "grab";
  });

  collectionsTrack.addEventListener("mouseup", () => {
    isDown = false;
    scrollPosition = currentX;
    collectionsTrack.style.cursor = "grab";
  });

  collectionsTrack.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX;
    const walk = (x - startX) * 1.5;
    const maxScroll = -(collectionsTrack.scrollWidth - collectionsTrack.parentElement.offsetWidth + 48);

    currentX = Math.max(maxScroll, Math.min(0, scrollPosition + walk));
    collectionsTrack.style.transform = `translateX(${currentX}px)`;
  });

  // Touch events for mobile
  collectionsTrack.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX;
  });

  collectionsTrack.addEventListener("touchend", () => {
    isDown = false;
    scrollPosition = currentX;
  });

  collectionsTrack.addEventListener("touchmove", (e) => {
    if (!isDown) return;

    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.5;
    const maxScroll = -(collectionsTrack.scrollWidth - collectionsTrack.parentElement.offsetWidth + 48);

    currentX = Math.max(maxScroll, Math.min(0, scrollPosition + walk));
    collectionsTrack.style.transform = `translateX(${currentX}px)`;
  });

  // Parallax effect on scroll
  window.addEventListener("scroll", () => {
    const section = document.querySelector(".collection-strip");
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const parallaxX = -progress * 100;
      collectionsTrack.style.transform = `translateX(${currentX + parallaxX}px)`;
    }
  });
}

// Materials section switcher
function initMaterialsSection() {
  materialBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const material = btn.dataset.material;

      // Update active button
      materialBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update active background
      materialBgs.forEach((bg) => {
        bg.classList.remove("active");
        if (bg.dataset.material === material) {
          bg.classList.add("active");
        }
      });

      // Update title with animation
      materialTitle.style.opacity = "0";
      setTimeout(() => {
        materialTitle.textContent =
          material.charAt(0).toUpperCase() + material.slice(1);
        materialTitle.style.opacity = "1";
      }, 200);
    });
  });
}

// Newsletter form validation
function initNewsletterForm() {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      // Success
      newsletterForm.style.display = "none";
      newsletterSuccess.classList.add("visible");
      errorMessage.classList.remove("visible");
    } else {
      // Error
      emailInput.classList.add("error");
      errorMessage.classList.add("visible");
    }
  });

  emailInput.addEventListener("input", () => {
    emailInput.classList.remove("error");
    errorMessage.classList.remove("visible");
  });
}

// Product cards click handler
function initProductCards() {
  productCards.forEach((card) => {
    card.addEventListener("click", () => {
      const productId = card.dataset.product;
      currentProduct = productsData[parseInt(productId) - 1];
      currentImageIndex = 0;
      selectedSwatchIndex = 0;
      openModal();
    });
  });
}

// Modal functionality
function initModal() {
  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && quickLookModal.classList.contains("visible")) {
      closeModal();
    }
  });

  // Gallery navigation
  document.getElementById("galleryPrev").addEventListener("click", () => {
    if (currentProduct) {
      currentImageIndex =
        (currentImageIndex - 1 + currentProduct.quickLookImages.length) %
        currentProduct.quickLookImages.length;
      updateModalGallery();
    }
  });

  document.getElementById("galleryNext").addEventListener("click", () => {
    if (currentProduct) {
      currentImageIndex =
        (currentImageIndex + 1) % currentProduct.quickLookImages.length;
      updateModalGallery();
    }
  });
}

function openModal() {
  if (!currentProduct) return;

  // Populate modal content
  document.getElementById("modalMainImage").src =
    currentProduct.quickLookImages[currentImageIndex];
  document.getElementById("modalMainImage").alt = currentProduct.name;
  document.getElementById("modalProductName").textContent = currentProduct.name;
  document.getElementById("modalProductMaterials").textContent =
    currentProduct.materials.join(", ");
  document.getElementById("modalPrice").textContent = currentProduct.price;
  document.getElementById("modalDimensions").textContent =
    currentProduct.dimensions;

  // Populate thumbnails
  const thumbnailsContainer = document.getElementById("galleryThumbnails");
  thumbnailsContainer.innerHTML = "";

  currentProduct.quickLookImages.forEach((img, index) => {
    const thumbnail = document.createElement("button");
    thumbnail.className = `thumbnail ${index === currentImageIndex ? "active" : ""}`;
    thumbnail.innerHTML = `<img src="${img}" alt="${currentProduct.name} thumbnail ${index + 1}">`;
    thumbnail.addEventListener("click", () => {
      currentImageIndex = index;
      updateModalGallery();
    });
    thumbnailsContainer.appendChild(thumbnail);
  });

  // Populate swatches
  const swatchesContainer = document.getElementById("modalSwatches");
  swatchesContainer.innerHTML = "";

  currentProduct.swatches.forEach((swatch, index) => {
    const swatchBtn = document.createElement("button");
    swatchBtn.className = `swatch ${index === selectedSwatchIndex ? "active" : ""}`;
    swatchBtn.style.backgroundColor = swatch.color;
    swatchBtn.innerHTML = `<span class="swatch-tooltip">${swatch.name}</span>`;
    swatchBtn.addEventListener("click", () => {
      selectedSwatchIndex = index;
      updateSwatches();
    });
    swatchesContainer.appendChild(swatchBtn);
  });

  // Show modal
  quickLookModal.classList.add("visible");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  quickLookModal.classList.remove("visible");
  document.body.style.overflow = "";
  currentProduct = null;
}

function updateModalGallery() {
  if (!currentProduct) return;

  document.getElementById("modalMainImage").src =
    currentProduct.quickLookImages[currentImageIndex];

  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumb, index) => {
    thumb.classList.toggle("active", index === currentImageIndex);
  });
}

function updateSwatches() {
  const swatches = document.querySelectorAll(".swatch");
  swatches.forEach((swatch, index) => {
    swatch.classList.toggle("active", index === selectedSwatchIndex);
  });
}

// Current year for footer
function initCurrentYear() {
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
}

// Smooth scroll for anchor links (if needed)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  });
});
