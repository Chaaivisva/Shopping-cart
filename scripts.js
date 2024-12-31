// Product Data
const products = [
    { id: 1, name: "Stylish Hoodie", price: 1499, image: "https://via.placeholder.com/300" },
    { id: 2, name: "Classic T-Shirt", price: 899, image: "https://via.placeholder.com/300" },
    { id: 3, name: "Denim Jacket", price: 2499, image: "https://via.placeholder.com/300" },
    { id: 4, name: "Summer Dress", price: 1999, image: "https://via.placeholder.com/300" },
    { id: 5, name: "Formal Shirt", price: 1299, image: "https://via.placeholder.com/300" },
    { id: 6, name: "Casual Shorts", price: 799, image: "https://via.placeholder.com/300" },
];

// Retrieve Cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save Cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Render Products
function renderProducts() {
    const productGrid = document.getElementById("productGrid");
    if (!productGrid) return;

    productGrid.innerHTML = products
        .map(
            (product) => `
        <div class="bg-white shadow rounded-lg overflow-hidden">
            <img src="${product.image}" alt="${product.name}" class="w-full">
            <div class="p-4">
                <h3 class="text-lg font-bold">${product.name}</h3>
                <p class="text-gray-600">₹${product.price}</p>
                <button onclick="addToCart(${product.id})" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                    Add to Cart
                </button>
            </div>
        </div>
    `
        )
        .join("");
}

// Add to Cart
function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    alert(`${product.name} added to cart!`);
    saveCart();
    updateCart();
}

// Decrease Quantity
function decreaseQuantity(productId) {
    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem) {
        cartItem.quantity -= 1;
        if (cartItem.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCart();
        }
    }
}

// Remove Item from Cart
function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    saveCart();
    updateCart();
}

// Update Cart Table
function updateCart() {
    const cartTable = document.getElementById("cartTable");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartTable || !cartTotal) return;

    if (cart.length === 0) {
        cartTable.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-gray-600">Your cart is empty.</td></tr>`;
        cartTotal.textContent = `Total: ₹0`;
        return;
    }

    cartTable.innerHTML = cart
        .map(
            (item) => `
        <tr>
            <td class="p-4">${item.name}</td>
            <td class="p-4">₹${item.price}</td>
            <td class="p-4">
                <button onclick="decreaseQuantity(${item.id})" class="bg-gray-200 px-3 py-1 rounded">-</button>
                <span class="mx-2">${item.quantity}</span>
                <button onclick="addToCart(${item.id})" class="bg-blue-500 text-white px-3 py-1 rounded">+</button>
            </td>
            <td class="p-4">₹${item.price * item.quantity}</td>
            <td class="p-4">
                <button onclick="removeFromCart(${item.id})" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </td>
        </tr>
    `
        )
        .join("");

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `Total: ₹${total}`;
}

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCart();
});
