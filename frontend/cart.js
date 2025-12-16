const API_BASE = "https://pawsomecareapp-production.up.railway.app/api";

let user = null;
let cartItems = [];

// ---------------- LOGIN CHECK ----------------
async function checkLogin() {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, { credentials: "include" });
    if (!res.ok) return null;

    const data = await res.json().catch(() => null);
    return data?.user || null;
  } catch (err) {
    return null;
  }
}

// ---------------- CART COUNT ----------------
function updateCartCountUI(n) {
  const countUI = document.querySelector(".cart-count");
  if (countUI) countUI.innerText = n;
}

// ---------------- RENDER CART ITEMS ----------------
function renderCartItems(items) {
  const cartContainer = document.querySelector(".cartpop");
  if (!cartContainer) return;

  cartContainer.innerHTML = `
    <p class="cart">MY CART<span class="checkout">checkout</span></p>
  `;

  items.forEach((item, idx) => {
    const sec = document.createElement("section");
    sec.className = "cartitems";

    sec.innerHTML = `
      <div class="cart_item_name">
        <img src="${item.pimage}" />
        <h4 class="cartitemname">${item.pname}</h4>
      </div>
      <p class="cartitemprice">₹${item.pprice}</p>
      <p class="cartdiscart" data-index="${idx}">X</p>
    `;

    cartContainer.appendChild(sec);

    document.querySelector(".checkout").addEventListener("click", ()=>{
    window.location.href = "checkout.html";
});

  });

  // remove item handling
  cartContainer.querySelectorAll(".cartdiscart").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const idx = parseInt(btn.dataset.index);

    const pid = items[idx]?.pid;
    if (!pid) return;

    await fetch(`${API_BASE}/cart/remove`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ pid })
    });

    await loadCartFromServer();
  });
});

}

// ---------------- FETCH CART ----------------
async function loadCartFromServer() {
  try {
    const res = await fetch(`${API_BASE}/cart`, { credentials: "include" });
    const data = await res.json();

    cartItems = data.items || [];
  } catch (err) {
    cartItems = [];
  }

  renderCartItems(cartItems);
  updateCartCountUI(cartItems.length);
}

// ---------------- SEND TO BACKEND ----------------
async function pushToCartBackend(item) {
  await fetch(`${API_BASE}/cart/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(item),
  });

  await loadCartFromServer();
}

// ---------------- MAIN ADD FUNCTION ----------------
async function handleAddToCart(item) {
  if (user) {
    await pushToCartBackend(item);
  } else {
    console.log("User not logged in");
  }
}

// ---------------- INIT CART ----------------
async function initCart() {
  user = await checkLogin();

  if (user) await loadCartFromServer();

 document.querySelectorAll(".addtocart").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();

    const box = e.target.closest(".cartselect_item");
    if (!box) return;

    const name = box.querySelector(".cartselect_itemname").innerText.trim();
    const rawPrice = box.querySelector(".price").innerText;
    const price = Number(rawPrice.replace(/[^0-9]/g, ""));
    const img = box.querySelector("img").src;

    const productId = name.toLowerCase().replace(/\s+/g, "_");

    await handleAddToCart({
      pid: productId,
      pname: name,
      pprice: price,
      pimage: img,
      pqty: 1
    });
  });
})
}


document.addEventListener("DOMContentLoaded", initCart);
