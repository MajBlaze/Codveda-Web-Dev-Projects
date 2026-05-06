const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const links = document.querySelectorAll(".nav-links a");

links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for your message! I will get back to you soon.");
  form.reset();
});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)";
  } else {
    navbar.style.boxShadow = "none";
  }
});
