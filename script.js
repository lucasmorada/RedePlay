// Contact Modal
function openContactModal() {
  const modal = document.getElementById("contactModal")
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeContactModal(event) {
  if (event && event.target !== event.currentTarget) return
  const modal = document.getElementById("contactModal")
  modal.classList.remove("active")
  document.body.style.overflow = ""
}

// Mobile Menu
function openMobileMenu() {
  const menu = document.getElementById("mobileMenu")
  menu.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeMobileMenu() {
  const menu = document.getElementById("mobileMenu")
  menu.classList.remove("active")
  document.body.style.overflow = ""
}

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeContactModal()
    closeMobileMenu()
  }
})

// Close mobile menu on window resize (if switching to desktop)
let resizeTimer
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    if (window.innerWidth >= 768) {
      closeMobileMenu()
    }
  }, 100)
})
