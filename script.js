// ========================================
// LAKBAY LOGO INTRO
// ========================================

const introScreen = document.getElementById("introScreen");
const continueBtn = document.getElementById("continueBtn");

document.body.classList.add("intro-locked");

if (continueBtn && introScreen) {
  continueBtn.addEventListener("click", () => {
    introScreen.classList.add("hide");
    document.body.classList.remove("intro-locked");
  });
}

const header = document.getElementById("siteHeader");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const searchBtn = document.getElementById("searchBtn");
const track = document.getElementById("destinationTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const toast = document.getElementById("toast");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
});

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  menuBtn.textContent = mobileMenu.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

searchBtn.addEventListener("click", () => {
  const query = prompt("Search destinations:");
  if (query && query.trim()) {
    showToast(`Searching for “${query.trim()}”`);
  }
});

document.querySelectorAll(".heart").forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("saved");
    button.textContent = button.classList.contains("saved") ? "♥" : "♡";
    showToast(button.classList.contains("saved") ? "Saved to your favorites" : "Removed from favorites");
  });
});

let position = 0;

function cardStep() {
  const card = track.querySelector(".destination-card");
  if (!card) return 0;
  return card.getBoundingClientRect().width + 9;
}

function visibleCards() {
  if (window.innerWidth <= 450) return 1;
  if (window.innerWidth <= 700) return 2;
  if (window.innerWidth <= 1000) return 3;
  return 5;
}

function moveSlider(direction) {
  const total = track.children.length;
  const maxPosition = Math.max(0, total - visibleCards());
  position = Math.min(maxPosition, Math.max(0, position + direction));
  track.style.transform = `translateX(-${position * cardStep()}px)`;
}

prevBtn.addEventListener("click", () => moveSlider(-1));
nextBtn.addEventListener("click", () => moveSlider(1));

window.addEventListener("resize", () => {
  position = Math.min(position, Math.max(0, track.children.length - visibleCards()));
  track.style.transform = `translateX(-${position * cardStep()}px)`;
});

document.getElementById("newsletterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  if (email) {
    event.target.reset();
    showToast("Thanks — you're on the list.");
  }
});
