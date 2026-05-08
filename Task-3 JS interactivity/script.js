const clickButton = document.getElementById("clickMe");
const form = document.getElementById("myForm");
const nameInput = document.getElementById("name");
const dropdownButton = document.getElementById("dropdownBtn");
const dropdownContent = document.getElementById("dropdownContent");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeModal");
const modal = document.getElementById("modal");

function showModal() {
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
}

function hideModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

clickButton.addEventListener("click", () => {
  alert("Button clicked!");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();

  if (!name) {
    alert("Please enter your name before submitting.");
    nameInput.focus();
    return;
  }

  alert(`Form submitted. Hi, ${name}!`);
  form.reset();
});

dropdownButton.addEventListener("click", () => {
  const isOpen = dropdownContent.style.display === "block";
  dropdownContent.style.display = isOpen ? "none" : "block";
  dropdownContent.setAttribute("aria-hidden", String(isOpen));
});

openModalButton.addEventListener("click", showModal);
closeModalButton.addEventListener("click", hideModal);

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    hideModal();
  }
});
