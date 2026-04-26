let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
}

function displayCart() {
    let cartItems = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");

    if (!cartItems) return;

    let total = 0;
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-box">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: ₹${itemTotal}</p>

                <button onclick="increaseQty(${index})">+</button>
                <button onclick="decreaseQty(${index})">−</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalPrice.innerText = "Grand Total: ₹" + total;
}
function increaseQty(index) {
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function removeItem(index) {
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function placeOrder() {
    let name = document.getElementById("customerName").value;
    let phone = document.getElementById("customerPhone").value;

    if (name === "" || phone === "") {
        alert("Please fill customer details");
        return;
    }

    let message = `Hello, I want to place an order:%0A%0A`;

    cart.forEach(item => {
        message += `${item.name} - ₹${item.price}%0A`;
    });

    let total = cart.reduce((sum, item) => sum + item.price, 0);

    message += `%0ATotal: ₹${total}%0A`;
    message += `Customer Name: ${name}%0A`;
    message += `Phone: ${phone}`;

    let whatsappNumber = "917306874214 "; // Replace with your WhatsApp number

    let url = `https://wa.me/${917306874214}?text=${message}`;

    window.open(url, "_blank");
}

displayCart();
function toggleMenu() {
    let navbar = document.getElementById("navbar");
    navbar.classList.toggle("active");
}