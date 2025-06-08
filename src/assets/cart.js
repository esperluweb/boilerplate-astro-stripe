// Panier simple en localStorage
const CART_KEY = 'astro_cart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const idx = cart.findIndex(item => item.id === product.id);
  if (idx !== -1) {
    cart[idx].qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  renderCart();
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
}

function changeQty(productId, qty) {
  const cart = getCart();
  const idx = cart.findIndex(item => item.id === productId);
  if (idx !== -1) {
    cart[idx].qty = Math.max(1, qty);
    saveCart(cart);
    renderCart();
  }
}

function renderCart() {
  const cart = getCart();
  const cartDiv = document.getElementById('cart');
  if (!cartDiv) return;
  if (cart.length === 0) {
    cartDiv.innerHTML = '<em>Votre panier est vide.</em>';
    return;
  }
  let html = '<ul>';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    html += `<li>${item.name} x <input type="number" min="1" value="${item.qty}" style="width:40px" onchange="changeQty('${item.id}', this.value)"> <button onclick="removeFromCart('${item.id}')">🗑️</button></li>`;
  });
  html += '</ul>';
  html += `<strong>Total : ${(total/100).toFixed(2)} €</strong><br>`;
  html += `<button onclick="checkoutCart()">Payer le panier</button>`;
  cartDiv.innerHTML = html;
}

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeQty = changeQty;
window.renderCart = renderCart;

window.checkoutCart = function() {
  const cart = getCart();
  if (cart.length === 0) return;
  
  // Préparer les données du panier avec les champs requis
  const cartData = cart.map(item => ({
    id: item.id,
    name: item.name || `Produit ${item.id}`,  // Ajouter un nom par défaut si manquant
    price: item.price,  // S'assurer que le prix est inclus
    qty: item.qty || 1,
    currency: item.currency || 'eur'
  }));

  // Créer un formulaire caché
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = '/api/checkout';
  
  // Ajouter le panier comme champ caché
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'cart';
  input.value = JSON.stringify(cartData);
  form.appendChild(input);
  
  // Soumettre le formulaire
  document.body.appendChild(form);
  form.submit();
};

document.addEventListener('DOMContentLoaded', renderCart);
