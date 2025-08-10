// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
    // Hide loading screen
    setTimeout(() => {
        document.getElementById("loading").classList.add("hidden");
    }, 500);

    // Initialize all components
    initMobileMenu();
    initCarousels();
    initBackToTop();
    initStickyCTA();
    initNavHighlights();
    initContactForm();
    initPriceCalculator();
    initFAQ();
    initCounters();
});

// Mobile menu toggle
function initMobileMenu() {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    function toggleMenu() {
        const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";
        menuBtn.setAttribute("aria-expanded", !isExpanded);
        mobileMenu.classList.toggle("hidden");
        document.body.style.overflow = isExpanded ? "auto" : "hidden";
    }

    menuBtn.addEventListener("click", toggleMenu);

    // Close mobile menu when clicking links
    document.querySelectorAll(".mobile-nav").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
            menuBtn.setAttribute("aria-expanded", false);
            document.body.style.overflow = "auto";
        });
    });
}

// Initialize infinite carousels
function initCarousels() {
    const carouselContainer = document.getElementById("carousel-container");
    if (!carouselContainer) return;

    // Solutions data
    const solutions = [
        {
            icon: "fa-user-check",
            title: "Face Recognition",
            description: "99.8% accuracy biometric identification",
        },
        {
            icon: "fa-shield-alt",
            title: "Weapon Detection",
            description: "Real-time gun & knife identification",
        },
        {
            icon: "fa-warehouse",
            title: "Warehouse Security",
            description: "Inventory monitoring & theft prevention",
        },
        {
            icon: "fa-industry",
            title: "Manufacturing",
            description: "Production line safety monitoring",
        },
        {
            icon: "fa-heartbeat",
            title: "Healthcare Security",
            description: "Patient & staff safety monitoring",
        },
        {
            icon: "fa-graduation-cap",
            title: "Education Security",
            description: "Campus safety & access control",
        },
        {
            icon: "fa-leaf",
            title: "Cannabis Security",
            description: "Compliance & inventory protection",
        },
        {
            icon: "fa-city",
            title: "Smart Cities",
            description: "Urban surveillance & traffic monitoring",
        },
        {
            icon: "fa-church",
            title: "Houses of Worship",
            description: "Community safety & crowd management",
        },
        {
            icon: "fa-search",
            title: "AI Search",
            description: "Find people/objects across footage",
        },
        {
            icon: "fa-clock",
            title: "Auto Attendance",
            description: "Contactless employee tracking",
        },
        {
            icon: "fa-users",
            title: "Crowd Analytics",
            description: "Density monitoring & flow analysis",
        },
    ];

    // Create 3 carousel rows
    const directions = ["slide-right", "slide-left", "slide-right"];
    const speeds = ["40s", "45s", "50s"];

    directions.forEach((direction, index) => {
        const carouselRow = document.createElement("div");
        carouselRow.className = `carousel-row ${direction} mb-8`;
        carouselRow.style.animationDuration = speeds[index];

        // Add solutions to carousel (duplicated for seamless looping)
        [...solutions, ...solutions].forEach((solution) => {
            const card = document.createElement("div");
            card.className = "solution-card";
            card.innerHTML = `
                <i class="fas ${solution.icon} text-[#00f5d0] text-2xl mb-3"></i>
                <h3 class="text-lg font-semibold mb-2">${solution.title}</h3>
                <p class="text-gray-400 text-sm">${solution.description}</p>
            `;
            carouselRow.appendChild(card);
        });

        carouselContainer.appendChild(carouselRow);
    });
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    backToTopButton.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Sticky CTA
function initStickyCTA() {
    const stickyCta = document.querySelector(".sticky-cta");
    if (!stickyCta) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            stickyCta.classList.add("show");
        } else {
            stickyCta.classList.remove("show");
        }
    });
}

// Navigation highlights
function initNavHighlights() {
    window.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".nav-link");

        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
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
}

// Contact form
function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validate email
        const email = document.getElementById("email");
        if (!email.validity.valid) {
            showAlert("Please enter a valid email address", "error");
            return;
        }

        // Validate phone if provided
        const phone = document.getElementById("phone");
        if (phone.value && !phone.validity.valid) {
            showAlert("Please enter a valid 10-digit phone number", "error");
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

        // Show success message
        showAlert("Thank you for your interest! Our team will contact you shortly.", "success");
        form.reset();
    });
}

function showAlert(message, type) {
    const alert = document.createElement("div");
    alert.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
        type === "error" ? "bg-red-600" : "bg-green-600"
    } text-white`;
    alert.textContent = message;
    document.body.appendChild(alert);

    setTimeout(() => {
        alert.classList.add("opacity-0", "translate-x-full");
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 3000);
}

// Price Calculator Logic
function initPriceCalculator() {
    calculatePrice(); // Initialize

    // Add event listeners to inputs
    document.getElementById("camera-count").addEventListener("input", calculatePrice);
    document.getElementById("ai-count").addEventListener("input", calculatePrice);
}

function calculatePrice() {
    const cameraCount = parseInt(document.getElementById("camera-count").value) || 0;
    const aiCount = parseInt(document.getElementById("ai-count").value) || 0;

    // Camera cost (₹200 per camera)
    const cameraCost = cameraCount * 200;

    // AI cost (₹5,000 per AI)
    const aiCost = aiCount * 5000;
    const aiCostsHtml =
        aiCount > 0
            ? `
        <div class="flex justify-between">
            <span>${aiCount} AI Algorithm${aiCount > 1 ? "s" : ""}:</span>
            <span class="font-medium">₹${aiCost.toLocaleString("en-IN")}</span>
        </div>
    `
            : "";

    // Update display
    document.getElementById("display-cameras").textContent = cameraCount;
    document.getElementById("cameras-cost").textContent = `₹${cameraCost.toLocaleString("en-IN")}`;
    document.getElementById("ai-costs-container").innerHTML = aiCostsHtml;
    document.getElementById("total-cost").textContent = `₹${(cameraCost + aiCost).toLocaleString(
        "en-IN"
    )}/month`;
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
    if (value < 0) value = 0;
    if (value > 10) value = 10;
    input.value = value;
    calculatePrice();
}

// FAQ Accordion
function initFAQ() {
    const faqToggles = document.querySelectorAll(".faq-toggle");

    faqToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector("i");

            toggle.classList.toggle("active");
            content.classList.toggle("show");

            if (toggle.classList.contains("active")) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0";
            }
        });
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll(".countup");
    const speed = 200;

    counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(initCounters, 1);
        } else {
            counter.innerText = target.toLocaleString();
        }
    });
}

// Smooth scrolling to elements
function scrollToElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
}

// Make functions globally available
window.scrollToElement = scrollToElement;
window.adjustCameraCount = adjustCameraCount;
window.adjustAiCount = adjustAiCount;
