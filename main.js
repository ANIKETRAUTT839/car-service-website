/* ================= SWIPER ================= */
if (document.querySelector(".mySwiper")) {
  new Swiper(".mySwiper", {
    loop: true,
  });
}

/* ================= ELEMENTS ================= */
const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");
const cardList = document.querySelector(".card-list"); // make sure this exists in HTML
const cartContent = document.querySelector(".cart-content");
const cartTotal = document.querySelector(".cart-total");
const cartValue = document.querySelector(".cart-value");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

/* ================= PRODUCTS DATA ================= */
let products = [
  { id:1, name:"Black Car", price:5000000, image:"vecteezy_a-black-car-on-a-transparent-background_53016763.png" },
  { id:2, name:"Modern Luxury Car", price:7500000, image:"vecteezy_modern-luxury-car-isolated-on-transparent-background_47242694.png" },
  { id:3, name:"White Sport Car", price:6500000, image:"vecteezy_white-sport-car-on-transparent-background-3d-rendering_25305916.png" }
];

let cart = [];

/* ================= OPEN / CLOSE CART ================= */
cartIcon.addEventListener("click", () => {
  cartTab.classList.add("cart-tab-active");
  document.body.classList.add("cart-open");
});

closeBtn.addEventListener("click", () => {
  cartTab.classList.remove("cart-tab-active");
  document.body.classList.remove("cart-open");
});

document.addEventListener("click", (e) => {
  if (cartTab.classList.contains("cart-tab-active") &&
      !cartTab.contains(e.target) &&
      !cartIcon.contains(e.target)) {
    cartTab.classList.remove("cart-tab-active");
    document.body.classList.remove("cart-open");
  }
});

/* ================= SHOW PRODUCTS ================= */
function showCards() {
  if(!cardList) return; // prevent errors if cardList not found
  cardList.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("order-bikes");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h4>${product.name}</h4>
      <h4 class="price">₹${product.price}</h4>
      <a href="#" class="btn add-btn">Add to cart</a>
    `;
    card.querySelector(".add-btn").addEventListener("click", (e)=>{
      e.preventDefault();
      addToCart(product);
    });
    cardList.appendChild(card);
  });
}

/* ================= ADD TO CART ================= */
function addToCart(product) {
  const existing = cart.find(item=>item.id===product.id);
  if(existing){ existing.quantity++; }
  else { cart.push({...product, quantity:1}); }
  updateCart();
  cartTab.classList.add("cart-tab-active");
}

/* ================= UPDATE CART ================= */
function updateCart() {
  cartContent.innerHTML = "";
  let total = 0, count = 0;

  if(cart.length === 0){
    cartContent.innerHTML = `<p style="text-align:center; margin-top:2rem;">Your cart is empty.</p>`;
    cartTotal.textContent = `₹0`;
    cartValue.textContent = 0;
    return;
  }

  cart.forEach(item=>{
    total += item.price*item.quantity;
    count += item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("item");
    cartItem.innerHTML = `
      <div class="item-image"><img src="${item.image}" alt="${item.name}"></div>
      <div class="detail">
        <h5>${item.name}</h5>
        <p>₹${item.price}</p>
        <div class="quantity-control">
          <button class="quantity-btn minus">-</button>
          <span class="quantity-value">${item.quantity}</span>
          <button class="quantity-btn plus">+</button>
        </div>
        <button class="remove-btn">Remove</button>
      </div>
    `;

    cartItem.querySelector(".plus").addEventListener("click", ()=>{ 
      item.quantity++; 
      updateCart(); 
    });

    cartItem.querySelector(".minus").addEventListener("click", ()=>{
      item.quantity--; 
      if(item.quantity <= 0){ 
        cart = cart.filter(p=>p.id!==item.id); 
      }
      updateCart();
    });

    cartItem.querySelector(".remove-btn").addEventListener("click", ()=>{
      cart = cart.filter(p=>p.id!==item.id); 
      updateCart();
    });

    cartContent.appendChild(cartItem);
  });

  cartTotal.textContent = `₹${total}`;
  cartValue.textContent = count;
}

/* ================= SEARCH GOOGLE ================= */
searchBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  const query = searchInput.value.trim();
  if(query){ window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank"); }
});

/* ================= INIT APP ================= */
function initApp(){ showCards(); }
initApp();
