"use strict";

/* ==========================================
   THE VELVET SPOON - CAKE DATA
========================================== */

const cakes = [
    {
        id: 1,
        name: "Blueberry Bliss",
        price: 849,
        category: "designer",
        badge: "NEW",
        image: "images/Blueberry Bliss.jpeg",
        description: "A delightful blueberry cake with creamy layers and a fresh berry finish."
    },
    {
        id: 2,
        name: "Chocolate Truffle Cake",
        price: 699,
        category: "chocolate",
        badge: "BESTSELLER",
        image: "images/Chocolate Truffle.jpeg",
        description: "Rich chocolate cake layered with smooth truffle cream."
    },
    {
        id: 3,
        name: "Classic Vanilla Cake",
        price: 549,
        category: "birthday",
        badge: "CLASSIC",
        image: "images/Classic Vanilla.jpeg",
        description: "Soft vanilla sponge with creamy frosting for every celebration."
    },
    {
        id: 4,
        name: "Coffee Mocha Cake",
        price: 799,
        category: "chocolate",
        badge: "FAVOURITE",
        image: "images/Coffee Mocha.jpeg",
        description: "A delicious coffee and chocolate combination for mocha lovers."
    },
    {
        id: 5,
        name: "Ferrero Rocher Cake",
        price: 1099,
        category: "chocolate",
        badge: "PREMIUM",
        image: "images/Ferrero Rocher.jpeg",
        description: "A luxurious chocolate cake topped with Ferrero Rocher chocolates."
    },
    {
        id: 6,
        name: "Heart Love Cake",
        price: 899,
        category: "designer",
        badge: "SPECIAL",
        image: "images/Heart Love.jpeg",
        description: "A beautiful heart-shaped cake made for special moments."
    },
    {
        id: 7,
        name: "Lotus Biscoff Cake",
        price: 999,
        category: "chocolate",
        badge: "TRENDING",
        image: "images/Lotus Biscoff.jpeg",
        description: "Creamy Biscoff cake with irresistible caramelised biscuit flavour."
    },
    {
        id: 8,
        name: "Mango Cream Cake",
        price: 749,
        category: "birthday",
        badge: "SEASONAL",
        image: "images/Mango Cream.jpeg",
        description: "Fresh mango flavour combined with soft sponge and creamy layers."
    },
    {
        id: 9,
        name: "Oreo Crunch Cake",
        price: 749,
        category: "chocolate",
        badge: "POPULAR",
        image: "images/Oreo Crunch.jpeg",
        description: "Chocolate cake packed with creamy Oreo goodness and crunchy cookies."
    },
    {
        id: 10,
        name: "Pink Blossom Cake",
        price: 999,
        category: "designer",
        badge: "PREMIUM",
        image: "images/Pink Blossom.jpeg",
        description: "An elegant pink designer cake perfect for beautiful celebrations."
    },
    {
        id: 11,
        name: "Rainbow Unicorn Cake",
        price: 1199,
        category: "birthday",
        badge: "KIDS FAVOURITE",
        image: "images/Rainbow Unicorn.jpeg",
        description: "A colourful and magical unicorn cake made for joyful celebrations."
    },
    {
        id: 12,
        name: "Red Velvet Dream",
        price: 799,
        category: "red-velvet",
        badge: "PREMIUM",
        image: "images/Red Velvet.jpeg",
        description: "Velvety red sponge with rich and creamy frosting."
    },
    {
        id: 13,
        name: "Strawberry Rose Cake",
        price: 899,
        category: "designer",
        badge: "NEW",
        image: "images/Strawberry Rose.jpeg",
        description: "A delicate strawberry cake with a beautiful rose-inspired finish."
    }
];


/* ==========================================
   SETTINGS
========================================== */

const WHATSAPP_NUMBER = "916289263336";

let cart = [];
let activeCategory = "all";
let searchTerm = "";


/* ==========================================
   GET HTML ELEMENTS
========================================== */

const themeBtn = document.getElementById("themeBtn");
const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");

const navLinks = document.getElementById("navLinks");
const hamburger = document.getElementById("hamburger");

const categories = document.getElementById("categories");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const searchResult = document.getElementById("searchResult");
const cakeGrid = document.getElementById("cakeGrid");

const customForm = document.getElementById("customForm");
const customName = document.getElementById("customName");
const customPhone = document.getElementById("customPhone");
const customFlavour = document.getElementById("customFlavour");
const customSize = document.getElementById("customSize");
const customDate = document.getElementById("customDate");
const customMessage = document.getElementById("customMessage");

const contactForm = document.getElementById("contactForm");

const cartOverlay = document.getElementById("cartOverlay");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutForm = document.getElementById("checkoutForm");

const orderName = document.getElementById("orderName");
const orderPhone = document.getElementById("orderPhone");
const orderEmail = document.getElementById("orderEmail");
const orderAddress = document.getElementById("orderAddress");
const deliveryDate = document.getElementById("deliveryDate");
const orderNote = document.getElementById("orderNote");

const lightbox = document.getElementById("lightbox");
const closeLightbox = document.getElementById("closeLightbox");
const lightboxImage = document.getElementById("lightboxImage");

const toast = document.getElementById("toast");


/* ==========================================
   PRICE FORMAT
========================================== */

function formatPrice(price) {
    return `₹${price.toLocaleString("en-IN")}`;
}


/* ==========================================
   FIND CAKE
========================================== */

function getCakeById(id) {
    return cakes.find(cake => cake.id === Number(id));
}


/* ==========================================
   TOAST MESSAGE
========================================== */

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


/* ==========================================
   DISPLAY CAKES
========================================== */

function displayCakes() {

    if (!cakeGrid) return;

    const filteredCakes = cakes.filter(cake => {

        const matchesCategory =
            activeCategory === "all" ||
            cake.category === activeCategory;

        const searchText =
            `${cake.name} ${cake.description} ${cake.category}`.toLowerCase();

        const matchesSearch =
            searchText.includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });


    cakeGrid.innerHTML = "";


    if (filteredCakes.length === 0) {

        cakeGrid.innerHTML = `
            <div class="no-results">
                <h3>No cakes found 🍰</h3>
                <p>Try another cake name or category.</p>
            </div>
        `;

        if (searchResult) {
            searchResult.textContent = "No cakes found.";
        }

        return;
    }


    if (searchResult) {

        if (searchTerm) {
            searchResult.textContent =
                `${filteredCakes.length} cake${filteredCakes.length > 1 ? "s" : ""} found`;
        } else {
            searchResult.textContent = "";
        }
    }


    filteredCakes.forEach(cake => {

        const card = document.createElement("article");

        card.className = "cake-card";


        card.innerHTML = `

            <div class="cake-image-wrapper">

                <img
                    src="${cake.image}"
                    alt="${cake.name}"
                    class="cake-image"
                >

                <span class="cake-badge">
                    ${cake.badge}
                </span>

            </div>


            <div class="cake-info">

                <h3>${cake.name}</h3>

                <p class="cake-description">
                    ${cake.description}
                </p>


                <div class="cake-bottom">

                    <span class="cake-price">
                        ${formatPrice(cake.price)}
                    </span>

                    <button
                        class="add-btn"
                        type="button"
                        data-add="${cake.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;


        const image = card.querySelector(".cake-image");

        image.addEventListener("error", function () {

            this.style.display = "none";

        });


        const addButton = card.querySelector("[data-add]");

        addButton.addEventListener("click", function () {

            addToCart(cake.id);

        });


        cakeGrid.appendChild(card);

    });
}


/* ==========================================
   CATEGORY FILTER
========================================== */

if (categories) {

    categories.addEventListener("click", function (event) {

        const button = event.target.closest("[data-category]");

        if (!button) return;

        activeCategory = button.dataset.category;


        categories
            .querySelectorAll("[data-category]")
            .forEach(btn => {
                btn.classList.remove("active");
            });


        button.classList.add("active");


        displayCakes();

    });

}


/* ==========================================
   SEARCH
========================================== */

if (searchInput) {

    searchInput.addEventListener("input", function () {

        searchTerm = this.value.trim();

        displayCakes();

    });

}


if (clearSearch) {

    clearSearch.addEventListener("click", function () {

        if (searchInput) {
            searchInput.value = "";
        }

        searchTerm = "";

        displayCakes();

    });

}


/* ==========================================
   CART - ADD ITEM
========================================== */

function addToCart(id) {

    const cake = getCakeById(id);

    if (!cake) return;


    const existingItem = cart.find(item => item.id === cake.id);


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...cake,
            quantity: 1
        });

    }


    updateCart();


    showToast(`${cake.name} added to cart 🛒`);

}


/* ==========================================
   CART - CHANGE QUANTITY
========================================== */

function changeQuantity(id, amount) {

    const item = cart.find(item => item.id === Number(id));

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart = cart.filter(cartItem => cartItem.id !== Number(id));

    }


    updateCart();

}


/* ==========================================
   CART - REMOVE
========================================== */

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== Number(id));

    updateCart();

    showToast("Cake removed from cart.");

}


/* ==========================================
   UPDATE CART
========================================== */

function updateCart() {

    if (!cartItems) return;


    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );


    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );


    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }


    if (cartTotal) {
        cartTotal.textContent = formatPrice(totalPrice);
    }


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        if (emptyCart) {
            emptyCart.style.display = "block";
        }

        if (checkoutButton) {
            checkoutButton.disabled = true;
        }

        return;
    }


    if (emptyCart) {
        emptyCart.style.display = "none";
    }


    if (checkoutButton) {
        checkoutButton.disabled = false;
    }


    cart.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
                class="cart-item-image"
            >


            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>${formatPrice(item.price)}</p>


                <div class="quantity-controls">

                    <button
                        type="button"
                        class="quantity-btn"
                        data-action="minus"
                        data-id="${item.id}"
                    >
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        type="button"
                        class="quantity-btn"
                        data-action="plus"
                        data-id="${item.id}"
                    >
                        +
                    </button>

                </div>


                <button
                    type="button"
                    class="remove-btn"
                    data-action="remove"
                    data-id="${item.id}"
                >
                    Remove
                </button>

            </div>

        `;


        const image = cartItem.querySelector(".cart-item-image");

        image.addEventListener("error", function () {
            this.style.display = "none";
        });


        cartItems.appendChild(cartItem);

    });

}


/* ==========================================
   CART BUTTON ACTIONS
========================================== */

if (cartItems) {

    cartItems.addEventListener("click", function (event) {

        const button = event.target.closest("[data-action]");

        if (!button) return;


        const id = Number(button.dataset.id);

        const action = button.dataset.action;


        if (action === "plus") {

            changeQuantity(id, 1);

        }


        if (action === "minus") {

            changeQuantity(id, -1);

        }


        if (action === "remove") {

            removeFromCart(id);

        }

    });

}


/* ==========================================
   OPEN CART
========================================== */

function openCart() {

    if (cartOverlay) {
        cartOverlay.classList.add("active");
    }

    if (cartPanel) {
        cartPanel.classList.add("active");
    }

    document.body.classList.add("no-scroll");

}


if (cartButton) {

    cartButton.addEventListener("click", openCart);

}


/* ==========================================
   CLOSE CART
========================================== */

function closeCartPanel() {

    if (cartOverlay) {
        cartOverlay.classList.remove("active");
    }

    if (cartPanel) {
        cartPanel.classList.remove("active");
    }

    document.body.classList.remove("no-scroll");

}


if (closeCart) {

    closeCart.addEventListener("click", closeCartPanel);

}


if (cartOverlay) {

    cartOverlay.addEventListener("click", closeCartPanel);

}


/* ==========================================
   CHECKOUT
========================================== */

if (checkoutButton) {

    checkoutButton.addEventListener("click", function () {

        if (cart.length === 0) {

            showToast("Your cart is empty.");

            return;

        }


        if (checkoutItems) {

            checkoutItems.innerHTML = "";


            cart.forEach(item => {

                const row = document.createElement("div");

                row.className = "checkout-item";


                row.innerHTML = `

                    <span>
                        ${item.name} × ${item.quantity}
                    </span>

                    <strong>
                        ${formatPrice(item.price * item.quantity)}
                    </strong>

                `;


                checkoutItems.appendChild(row);

            });

        }


        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );


        if (checkoutTotal) {
            checkoutTotal.textContent = formatPrice(total);
        }


        if (checkoutModal) {
            checkoutModal.classList.add("active");
        }

    });

}


/* ==========================================
   CLOSE CHECKOUT
========================================== */

if (closeCheckout) {

    closeCheckout.addEventListener("click", function () {

        checkoutModal.classList.remove("active");

    });

}


/* ==========================================
   CHECKOUT FORM
========================================== */

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (event) {

        event.preventDefault();


        if (cart.length === 0) {

            showToast("Your cart is empty.");

            return;

        }


        const name = orderName.value.trim();
        const phone = orderPhone.value.trim();
        const email = orderEmail.value.trim();
        const address = orderAddress.value.trim();
        const date = deliveryDate.value;
        const note = orderNote.value.trim();


        let message = `Hello The Velvet Spoon! 🍰

I would like to place an order.

CUSTOMER DETAILS
Name: ${name}
Phone: ${phone}
Email: ${email}
Address: ${address}
Delivery Date: ${date || "Not specified"}

ORDER DETAILS
`;


        cart.forEach(item => {

            message += `
${item.name}
Quantity: ${item.quantity}
Price: ${formatPrice(item.price * item.quantity)}
`;

        });


        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );


        message += `
TOTAL: ${formatPrice(total)}

Special Note:
${note || "None"}

Thank you!`;


        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


        window.open(whatsappURL, "_blank");


        checkoutForm.reset();

        cart = [];

        updateCart();


        checkoutModal.classList.remove("active");

        closeCartPanel();


        showToast("Order details sent to WhatsApp 💚");

    });

}


/* ==========================================
   CUSTOM CAKE FORM
========================================== */

if (customForm) {

    customForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name = customName.value.trim();
        const phone = customPhone.value.trim();
        const flavour = customFlavour.value;
        const size = customSize.value;
        const date = customDate.value;
        const messageText = customMessage.value.trim();


        const message = `Hello The Velvet Spoon! 🎂

I want to request a CUSTOM CAKE.

Name: ${name}
Phone: ${phone}
Flavour: ${flavour}
Size: ${size}
Required Date: ${date}

Cake Details:
${messageText || "No additional details."}
`;


        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


        window.open(whatsappURL, "_blank");


        customForm.reset();

        showToast("Custom cake request sent 💕");

    });

}


/* ==========================================
   CONTACT FORM
========================================== */

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        showToast(
            "Thank you! Your message has been received. 💌"
        );


        contactForm.reset();

    });

}


/* ==========================================
   DARK / LIGHT MODE
========================================== */

function updateThemeButton() {

    if (!themeBtn) return;


    const darkMode =
        document.body.classList.contains("dark-mode");


    themeBtn.textContent =
        darkMode ? "☀️" : "🌙";


    themeBtn.setAttribute(
        "aria-label",
        darkMode ? "Switch to light mode" : "Switch to dark mode"
    );

}


if (localStorage.getItem("velvetTheme") === "dark") {

    document.body.classList.add("dark-mode");

}


updateThemeButton();


if (themeBtn) {

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");


        const isDark =
            document.body.classList.contains("dark-mode");


        localStorage.setItem(
            "velvetTheme",
            isDark ? "dark" : "light"
        );


        updateThemeButton();

    });

}


/* ==========================================
   HAMBURGER MENU
========================================== */

if (hamburger && navLinks) {

    hamburger.addEventListener("click", function () {

        navLinks.classList.toggle("active");


        const isOpen =
            navLinks.classList.contains("active");


        hamburger.textContent =
            isOpen ? "✕" : "☰";


        hamburger.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            hamburger.textContent = "☰";

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* ==========================================
   GALLERY LIGHTBOX
========================================== */

document.querySelectorAll(".gallery-item img").forEach(image => {

    image.addEventListener("click", function () {

        if (!lightbox || !lightboxImage) return;


        lightboxImage.src = this.src;

        lightboxImage.alt = this.alt;


        lightbox.classList.add("active");

    });

});


if (closeLightbox) {

    closeLightbox.addEventListener("click", function () {

        lightbox.classList.remove("active");

    });

}


if (lightbox) {

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {

            lightbox.classList.remove("active");

        }

    });

}


/* ==========================================
   ESCAPE KEY
========================================== */

document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") return;


    closeCartPanel();


    if (checkoutModal) {
        checkoutModal.classList.remove("active");
    }


    if (lightbox) {
        lightbox.classList.remove("active");
    }


    if (navLinks) {
        navLinks.classList.remove("active");
    }


    if (hamburger) {
        hamburger.textContent = "☰";
        hamburger.setAttribute("aria-expanded", "false");
    }

});


/* ==========================================
   SET MINIMUM DATES
========================================== */

const today = new Date().toISOString().split("T")[0];


if (customDate) {
    customDate.min = today;
}


if (deliveryDate) {
    deliveryDate.min = today;
}


/* ==========================================
   SMOOTH NAVIGATION
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");


        if (!targetId || targetId === "#") return;


        const target = document.querySelector(targetId);


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* ==========================================
   INITIAL LOAD
========================================== */

displayCakes();

updateCart();


/* ==========================================
   MAKE addToCart AVAILABLE TO HTML
========================================== */

window.addToCart = addToCart;