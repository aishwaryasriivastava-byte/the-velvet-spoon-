"use strict";

/* ==========================================
   THE VELVET SPOON
========================================== */


/* ==========================================
   CAKE DATA
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
   HTML ELEMENTS
========================================== */

const themeBtn =
    document.getElementById("themeBtn");

const cartButton =
    document.getElementById("cartButton");

const cartCount =
    document.getElementById("cartCount");

const navLinks =
    document.getElementById("navLinks");

const hamburger =
    document.getElementById("hamburger");

const categories =
    document.getElementById("categories");

const searchInput =
    document.getElementById("searchInput");

const clearSearch =
    document.getElementById("clearSearch");

const searchResult =
    document.getElementById("searchResult");

const cakeGrid =
    document.getElementById("cakesGrid");


/* CUSTOM FORM */

const customForm =
    document.getElementById("customForm");

const customName =
    document.getElementById("custName");

const customPhone =
    document.getElementById("custPhone");

const customFlavour =
    document.getElementById("cakeFlavour");

const customSize =
    document.getElementById("cakeWeight");

const customDate =
    document.getElementById("delDate");

const customMessage =
    document.getElementById("custMessage");


/* CART */

const cartOverlay =
    document.getElementById("cartOverlay");

const cartPanel =
    document.getElementById("cartPanel");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");


/* CHECKOUT */

const checkoutModal =
    document.getElementById("checkoutModal");

const closeCheckout =
    document.getElementById("closeCheckout");

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const checkoutForm =
    document.getElementById("checkoutForm");

const orderName =
    document.getElementById("orderName");

const orderPhone =
    document.getElementById("orderPhone");

const orderEmail =
    document.getElementById("orderEmail");

const orderAddress =
    document.getElementById("orderAddress");

const deliveryDate =
    document.getElementById("deliveryDate");

const orderNote =
    document.getElementById("orderNote");


/* LIGHTBOX */

const lightbox =
    document.getElementById("lightbox");

const closeLightbox =
    document.getElementById("closeLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");


/* TOAST */

const toast =
    document.getElementById("toast");


/* ==========================================
   IMAGE FALLBACK
========================================== */

function addImageFallback(image) {

    if (!image) return;

    image.addEventListener("error", function () {

        if (this.dataset.fallbackUsed === "true") {

            this.style.display = "none";

            return;
        }

        const currentSource =
            this.getAttribute("src");

        if (
            currentSource &&
            currentSource.startsWith("images/")
        ) {

            const fileName =
                currentSource.replace("images/", "");

            this.dataset.fallbackUsed = "true";

            this.src = fileName;

        } else {

            this.style.display = "none";

        }

    });

}


/* ==========================================
   PRICE
========================================== */

function formatPrice(price) {

    return `₹${price.toLocaleString("en-IN")}`;

}


/* ==========================================
   FIND CAKE
========================================== */

function getCakeById(id) {

    return cakes.find(
        cake => cake.id === Number(id)
    );

}


/* ==========================================
   TOAST
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

    const filteredCakes =
        cakes.filter(cake => {

            const categoryMatch =
                activeCategory === "all" ||
                cake.category === activeCategory;

            const text =
                `${cake.name} ${cake.description} ${cake.category}`
                .toLowerCase();

            const searchMatch =
                text.includes(
                    searchTerm.toLowerCase()
                );

            return categoryMatch && searchMatch;

        });


    cakeGrid.innerHTML = "";


    if (filteredCakes.length === 0) {

        cakeGrid.innerHTML = `
            <div class="no-results">
                <h3>No cakes found 🍰</h3>
                <p>Try another cake name or category.</p>
            </div>
        `;

        return;

    }


    if (searchResult) {

        searchResult.textContent =
            searchTerm
                ? `${filteredCakes.length} cake(s) found`
                : "";

    }


    filteredCakes.forEach(cake => {

        const card =
            document.createElement("article");

        card.className =
            "cake-card";


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

                <h3>
                    ${cake.name}
                </h3>

                <p class="cake-description">
                    ${cake.description}
                </p>


                <div class="cake-bottom">

                    <span class="cake-price">
                        ${formatPrice(cake.price)}
                    </span>

                    <button
                        class="add-btn"
                        data-id="${cake.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;


        const image =
            card.querySelector(".cake-image");

        addImageFallback(image);


        const addButton =
            card.querySelector(".add-btn");


        addButton.addEventListener(
            "click",
            () => {

                addToCart(cake.id);

            }
        );


        cakeGrid.appendChild(card);

    });

}


/* ==========================================
   CATEGORY FILTER
========================================== */

if (categories) {

    categories.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-category]"
                );

            if (!button) return;


            activeCategory =
                button.dataset.category;


            categories
                .querySelectorAll(
                    "[data-category]"
                )
                .forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


            button.classList.add("active");


            displayCakes();

        }
    );

}


/* ==========================================
   SEARCH
========================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        event => {

            searchTerm =
                event.target.value.trim();

            displayCakes();

        }
    );

}


if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        () => {

            searchInput.value = "";

            searchTerm = "";

            displayCakes();

        }
    );

}


/* ==========================================
   ADD TO CART
========================================== */

function addToCart(id) {

    const cake =
        getCakeById(id);

    if (!cake) return;


    const existing =
        cart.find(
            item => item.id === cake.id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...cake,
            quantity: 1
        });

    }


    updateCart();


    showToast(
        `${cake.name} added to cart 🛒`
    );

}


/* ==========================================
   CHANGE QUANTITY
========================================== */

function changeQuantity(id, amount) {

    const item =
        cart.find(
            item => item.id === Number(id)
        );

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== Number(id)
            );

    }


    updateCart();

}


/* ==========================================
   REMOVE
========================================== */

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== Number(id)
        );


    updateCart();


    showToast(
        "Cake removed from cart."
    );

}


/* ==========================================
   UPDATE CART
========================================== */

function updateCart() {

    const totalQuantity =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    const totalPrice =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        formatPrice(totalPrice);


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.appendChild(emptyCart);

        emptyCart.style.display =
            "block";

        checkoutButton.disabled =
            true;

        return;

    }


    emptyCart.style.display =
        "none";

    checkoutButton.disabled =
        false;


    cart.forEach(item => {

        const div =
            document.createElement("div");

        div.className =
            "cart-item";


        div.innerHTML = `

            <img
                src="${item.image}"
                class="cart-item-image"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ${formatPrice(item.price)}
                </p>


                <div class="quantity-controls">

                    <button
                        class="quantity-btn"
                        data-action="minus"
                        data-id="${item.id}"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        class="quantity-btn"
                        data-action="plus"
                        data-id="${item.id}"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-btn"
                    data-action="remove"
                    data-id="${item.id}"
                >
                    Remove
                </button>

            </div>

        `;


        addImageFallback(
            div.querySelector(
                ".cart-item-image"
            )
        );


        cartItems.appendChild(div);

    });

}


/* ==========================================
   CART CONTROLS
========================================== */

cartItems.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-action]"
            );

        if (!button) return;


        const id =
            Number(button.dataset.id);


        if (
            button.dataset.action === "plus"
        ) {

            changeQuantity(id, 1);

        }


        if (
            button.dataset.action === "minus"
        ) {

            changeQuantity(id, -1);

        }


        if (
            button.dataset.action === "remove"
        ) {

            removeFromCart(id);

        }

    }
);


/* ==========================================
   OPEN CART
========================================== */

function openCart() {

    cartOverlay.classList.add("active");

    cartPanel.classList.add("active");

    document.body.classList.add(
        "no-scroll"
    );

}


cartButton.addEventListener(
    "click",
    openCart
);


/* ==========================================
   CLOSE CART
========================================== */

function closeCartPanel() {

    cartOverlay.classList.remove(
        "active"
    );

    cartPanel.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


closeCart.addEventListener(
    "click",
    closeCartPanel
);


cartOverlay.addEventListener(
    "click",
    closeCartPanel
);


/* ==========================================
   CHECKOUT
========================================== */

checkoutButton.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            showToast(
                "Your cart is empty."
            );

            return;

        }


        checkoutItems.innerHTML = "";


        cart.forEach(item => {

            const row =
                document.createElement("div");

            row.className =
                "checkout-item";


            row.innerHTML = `

                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <strong>
                    ${formatPrice(
                        item.price *
                        item.quantity
                    )}
                </strong>

            `;


            checkoutItems.appendChild(row);

        });


        const total =
            cart.reduce(
                (sum, item) =>
                    sum +
                    item.price *
                    item.quantity,
                0
            );


        checkoutTotal.textContent =
            formatPrice(total);


        checkoutModal.classList.add(
            "active"
        );

    }
);


/* ==========================================
   CLOSE CHECKOUT
========================================== */

closeCheckout.addEventListener(
    "click",
    () => {

        checkoutModal.classList.remove(
            "active"
        );

    }
);


/* ==========================================
   CHECKOUT FORM
========================================== */

checkoutForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            orderName.value.trim();

        const phone =
            orderPhone.value.trim();

        const email =
            orderEmail.value.trim();

        const address =
            orderAddress.value.trim();

        const date =
            deliveryDate.value;

        const note =
            orderNote.value.trim();


        let message = `
Hello The Velvet Spoon! 🍰

I would like to place an order.

CUSTOMER DETAILS

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}
Address: ${address}
Delivery Date: ${date || "Not specified"}

ORDER DETAILS
`;


        cart.forEach(item => {

            message += `

${item.name}
Quantity: ${item.quantity}
Price: ${formatPrice(
                item.price *
                item.quantity
            )}
`;

        });


        const total =
            cart.reduce(
                (sum, item) =>
                    sum +
                    item.price *
                    item.quantity,
                0
            );


        message += `

TOTAL:
${formatPrice(total)}

Special Note:
${note || "None"}

Thank you!
`;


        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                message
            )}`;


        window.open(
            whatsappURL,
            "_blank"
        );


        cart = [];

        updateCart();

        checkoutForm.reset();

        checkoutModal.classList.remove(
            "active"
        );

        closeCartPanel();


        showToast(
            "Order details sent to WhatsApp 💚"
        );

    }
);


/* ==========================================
   CUSTOM CAKE
========================================== */

customForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            customName.value.trim();

        const phone =
            customPhone.value.trim();

        const flavour =
            customFlavour.value;

        const size =
            customSize.value;

        const date =
            customDate.value;

        const details =
            customMessage.value.trim();


        const message = `
Hello The Velvet Spoon! 🎂

I want to request a CUSTOM CAKE.

Name: ${name}
Phone: ${phone}
Flavour: ${flavour}
Weight: ${size}
Required Date: ${date}

Cake Details:
${details || "No additional details."}
`;


        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                message
            )}`;


        window.open(
            whatsappURL,
            "_blank"
        );


        customForm.reset();


        showToast(
            "Custom cake request sent 💕"
        );

    }
);


/* ==========================================
   DARK MODE
========================================== */

function updateThemeButton() {

    const dark =
        document.body.classList.contains(
            "dark-mode"
        );


    themeBtn.textContent =
        dark ? "☀️" : "🌙";

}


if (
    localStorage.getItem(
        "velvetTheme"
    ) === "dark"
) {

    document.body.classList.add(
        "dark-mode"
    );

}


updateThemeButton();


themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );


        const dark =
            document.body.classList.contains(
                "dark-mode"
            );


        localStorage.setItem(
            "velvetTheme",
            dark ? "dark" : "light"
        );


        updateThemeButton();

    }
);


/* ==========================================
   HAMBURGER
========================================== */

hamburger.addEventListener(
    "click",
    () => {

        navLinks.classList.toggle(
            "active"
        );


        const open =
            navLinks.classList.contains(
                "active"
            );


        hamburger.textContent =
            open ? "✕" : "☰";

    }
);


navLinks
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navLinks.classList.remove(
                    "active"
                );

                hamburger.textContent =
                    "☰";

            }
        );

    });


/* ==========================================
   GALLERY LIGHTBOX
========================================== */

document
    .querySelectorAll(".gallery-item img")
    .forEach(image => {

        addImageFallback(image);


        image.addEventListener(
            "click",
            () => {

                lightboxImage.src =
                    image.src;

                lightboxImage.alt =
                    image.alt;

                lightbox.classList.add(
                    "active"
                );

            }
        );

    });


closeLightbox.addEventListener(
    "click",
    () => {

        lightbox.classList.remove(
            "active"
        );

    }
);


lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            lightbox.classList.remove(
                "active"
            );

        }

    }
);


/* ==========================================
   ESCAPE
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") return;


        closeCartPanel();


        checkoutModal.classList.remove(
            "active"
        );


        lightbox.classList.remove(
            "active"
        );


        navLinks.classList.remove(
            "active"
        );


        hamburger.textContent =
            "☰";

    }
);


/* ==========================================
   DATE
========================================== */

const today =
    new Date()
        .toISOString()
        .split("T")[0];


customDate.min =
    today;

deliveryDate.min =
    today;


/* ==========================================
   SMOOTH SCROLL
========================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });


/* ==========================================
   START
========================================== */

displayCakes();

updateCart();


/* GLOBAL */

window.addToCart =
    addToCart;