// ========================================
// JAYDESIGNS WEBSITE INTERACTIONS
// ========================================

// IMPORTANT:
// Replace this placeholder with Jerry's real WhatsApp number.
// Ghana example:
// If the number is 0241234567, write 233241234567.
// Use digits only. Do not include + or spaces.

const WHATSAPP_NUMBER = "233208154307";


// ========================================
// 1. MOBILE NAVIGATION MENU
// ========================================

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

function closeMenu() {
    if (!menuToggle || !mainNav) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    mainNav.classList.remove("open");
    document.body.classList.remove("menu-open");
}

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Open navigation menu"
                : "Close navigation menu"
        );

        mainNav.classList.toggle("open", !isOpen);
        document.body.classList.toggle("menu-open", !isOpen);
    });

    // Close the menu when a navigation link is clicked.
    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Close the mobile menu when switching to desktop width.
    window.addEventListener("resize", () => {
        if (window.innerWidth > 720) {
            closeMenu();
        }
    });
}


// ========================================
// 2. PORTFOLIO CATEGORY FILTERS
// ========================================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const workCount = document.querySelector("#work-count");

// Update the number of designs currently displayed.
function updateVisibleCount() {
    const visibleItems = [...portfolioItems].filter(
        (item) => !item.hidden
    ).length;

    if (workCount) {
        workCount.textContent =
            `${String(visibleItems).padStart(2, "0")} design` +
            `${visibleItems === 1 ? "" : "s"}`;
    }
}

// Filter designs when a category button is clicked.
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        // Update the active filter button.
        filterButtons.forEach((filterButton) => {
            const isSelected = filterButton === button;

            filterButton.classList.toggle(
                "active",
                isSelected
            );

            filterButton.setAttribute(
                "aria-pressed",
                String(isSelected)
            );
        });

        // Show only designs matching the selected category.
        portfolioItems.forEach((item) => {
            const itemCategory = item.dataset.category;

            item.hidden =
                selectedFilter !== "all" &&
                itemCategory !== selectedFilter;
        });

        updateVisibleCount();
    });
});

// Set the correct design count when the page loads.
updateVisibleCount();


// ========================================
// 3. PORTFOLIO IMAGE PREVIEW
// ========================================

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxTitle = document.querySelector("#lightbox-title");
const lightboxClose = document.querySelector(".lightbox-close");

// Open a larger preview when a design is clicked.
portfolioItems.forEach((item) => {
    item.addEventListener("click", () => {
        const imagePath = item.dataset.image;
        const imageTitle = item.dataset.title;

        // If the browser does not support the dialog preview,
        // open the image in a separate tab.
        if (
            !lightbox ||
            !lightboxImage ||
            !lightboxTitle ||
            typeof lightbox.showModal !== "function"
        ) {
            if (imagePath) {
                window.open(
                    decodeURIComponent(imagePath),
                    "_blank",
                    "noopener"
                );
            }

            return;
        }

        lightboxImage.src = decodeURIComponent(imagePath);
        lightboxImage.alt = imageTitle || "Jaydesigns portfolio image";
        lightboxTitle.textContent = imageTitle || "Jaydesigns Portfolio";

        lightbox.showModal();
    });
});

// Close the image preview using the close button.
if (lightboxClose && lightbox) {
    lightboxClose.addEventListener("click", () => {
        lightbox.close();
    });

    // Close the preview when the area outside the image is clicked.
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            lightbox.close();
        }
    });
}


// ========================================
// 4. WHATSAPP CONTACT FORM
// ========================================

const contactForm = document.querySelector("#contact-form");
const formError = document.querySelector("#form-error");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        // Stop the browser from submitting the form normally.
        event.preventDefault();

        const nameInput = document.querySelector("#customer-name");
        const serviceInput = document.querySelector("#customer-service");
        const detailsInput = document.querySelector("#customer-details");

        // Make sure the expected form fields exist.
        if (!nameInput || !serviceInput || !detailsInput) {
            return;
        }

        const customerName = nameInput.value.trim();
        const selectedService = serviceInput.value;
        const projectDetails = detailsInput.value.trim();

        // Check whether a real phone number has been entered above.
        const validNumber =
            /^\d{10,15}$/.test(WHATSAPP_NUMBER) &&
            !WHATSAPP_NUMBER.includes("X");

        if (!validNumber) {
            if (formError) {
                formError.hidden = false;
                formError.textContent =
                    "The WhatsApp number has not been configured yet. " +
                    "Please contact Jaydesigns directly.";
            }

            return;
        }

        if (formError) {
            formError.hidden = true;
        }

        // Build the message that will be sent to WhatsApp.
        const message = [
            "Hello Jaydesigns! I'd like to enquire about a design.",
            "",
            `Name: ${customerName}`,
            `Service: ${selectedService}`,
            `Project details: ${projectDetails}`
        ].join("\n");

        // Create the WhatsApp chat link.
        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=` +
            encodeURIComponent(message);

        // Open WhatsApp in a new tab.
        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );
    });
}


// ========================================
// 5. AUTOMATIC FOOTER YEAR
// ========================================

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}