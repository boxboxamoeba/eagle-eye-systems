// Mobile menu toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    menuBtn.setAttribute("aria-expanded", !mobileMenu.classList.contains("hidden"));
});

// Close mobile menu when clicking links
document.querySelectorAll(".mobile-nav").forEach((link) => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", false);
    });
});

// Scroll to contact section
function scrollToContact() {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// Scroll to features section
function scrollToFeatures() {
    document.getElementById("features").scrollIntoView({ behavior: "smooth" });
}

// Back to top button
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }

    // Show sticky CTA when scrolled past hero
    const stickyCta = document.querySelector(".sticky-cta");
    if (window.scrollY > 500) {
        stickyCta.classList.add("show");
    } else {
        stickyCta.classList.remove("show");
    }
});

backToTopButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Add active class to navigation links
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("text-[#00f5d0]", "font-medium");
        if (link.getAttribute("href").substring(1) === current) {
            link.classList.add("text-[#00f5d0]", "font-medium");
        }
    });
});

// Form submission
const form = document.getElementById("contact-form");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Simple validation
        const email = document.getElementById("email");
        if (!email.validity.valid) {
            alert("Please enter a valid email address");
            return;
        }

        const phone = document.getElementById("phone");
        if (phone.value && !phone.validity.valid) {
            alert("Please enter a valid 10-digit phone number");
            return;
        }

        // Form data collection
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Here you would typically send the data to a server
        console.log("Form submitted:", data);

        alert("Thank you for your interest! Our team will contact you shortly.");
        form.reset();
    });
}

// Price Calculator Logic
function calculatePrice() {
    const cameraCount = parseInt(document.getElementById("camera-count").value) || 0;
    const aiCount = parseInt(document.getElementById("ai-count").value) || 0;

    // Camera cost (₹300 per camera)
    const cameraCost = cameraCount * 200;

    // AI cost (1.5× multiplier for each additional AI)
    let aiCost = 0;
    let aiCostsHtml = "";

    if (aiCount >= 1) {
        aiCost = 2000 * Math.pow(1.5, aiCount - 1);
        aiCostsHtml = `<div class="flex justify-between">
        <span>${aiCount} AI Algorithm${aiCount > 1 ? "s" : ""}:</span>
        <span class="font-medium">₹${aiCost.toLocaleString("en-IN")}</span>
    </div>`;
    }

    // Update display
    document.getElementById("display-cameras").textContent = cameraCount;
    document.getElementById("cameras-cost").textContent = `₹${cameraCost.toLocaleString(
        "en-IN"
    )}`;
    document.getElementById("ai-costs-container").innerHTML = aiCostsHtml;
    document.getElementById("total-cost").textContent = `₹${(
        cameraCost + aiCost
    ).toLocaleString("en-IN")}`;
}

function adjustCameraCount(change) {
    const input = document.getElementById("camera-count");
    let value = parseInt(input.value) || 0;
    value += change;
    if (value < 1) value = 1;
    if (value > 100) value = 100;
    input.value = value;
    calculatePrice();
}

function adjustAiCount(change) {
    const input = document.getElementById("ai-count");
    let value = parseInt(input.value) || 0;
    value += change;
    if (value < 1) value = 1;
    if (value > 10) value = 10;
    input.value = value;
    calculatePrice();
}

// Add event listeners to inputs
document.getElementById("camera-count").addEventListener("input", calculatePrice);
document.getElementById("ai-count").addEventListener("input", calculatePrice);

// Initialize calculator
calculatePrice();