const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const welcomeBtn = document.getElementById("welcomeBtn");
const welcomeText = document.getElementById("welcomeText");
const toggleActivities = document.getElementById("toggleActivities");
const categoryFilter = document.getElementById("categoryFilter");
const cards = document.querySelectorAll(".card[data-cat]");
const extraCards = document.querySelectorAll(".extra");
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
const revealItems = document.querySelectorAll(".hero-text, .hero-box, .section, .stat-card, .card, .event-card, .contact-form");
const paletteButtons = document.querySelectorAll(".palette-btn");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
});

paletteButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const theme = button.dataset.theme;
        document.body.classList.remove("theme-sunset", "theme-mint");
        if (theme === "sunset") {
            document.body.classList.add("theme-sunset");
        }
        if (theme === "mint") {
            document.body.classList.add("theme-mint");
        }
        paletteButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
    });
});

const welcomeNotes = [
    "Welcome to Campus Club. You are going to enjoy learning here.",
    "Happy to see you here. Join one session and meet new people.",
    "Great start. Explore activities and pick one this week."
];

let noteIndex = 0;
welcomeBtn.addEventListener("click", () => {
    welcomeText.textContent = welcomeNotes[noteIndex];
    noteIndex = (noteIndex + 1) % welcomeNotes.length;
});

let expanded = false;

function applyFilter() {
    const selected = categoryFilter.value;
    cards.forEach((card) => {
        const category = card.dataset.cat;
        const isExtra = card.classList.contains("extra");
        const hiddenByExpand = isExtra && !expanded;
        const hiddenByFilter = selected !== "all" && category !== selected;
        card.classList.toggle("hidden-card", hiddenByExpand);
        card.classList.toggle("filtered-out", !hiddenByExpand && hiddenByFilter);
    });
}

toggleActivities.addEventListener("click", () => {
    expanded = !expanded;
    toggleActivities.textContent = expanded ? "Show Less" : "Show More";
    applyFilter();
});

categoryFilter.addEventListener("change", applyFilter);

applyFilter();

revealItems.forEach((item) => {
    item.classList.add("reveal");
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealItems.forEach((item) => observer.observe(item));

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {
        formMsg.textContent = "Please enter name and email.";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        formMsg.textContent = "Please enter a valid email.";
        return;
    }

    formMsg.textContent = "Thank you. We will contact you soon.";
    contactForm.reset();
});
