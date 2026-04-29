function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id){

  const cart = getCart();

  const item = cart.find(p => p.id === id);

  if(item){
    item.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }

  saveCart(cart); 

  window.dispatchEvent(new Event("cartUpdated"));
}

function removeFromCart(id){
  const updated = getCart().filter(p=>p.id !== id);
  saveCart(updated);
  window.dispatchEvent(new Event("cartUpdated"));
}

function updateQty(id,qty){

  let cart = getCart();

  const item = cart.find(p=>p.id===id);

  if(!item) return;

  if(qty<=0){
    cart = cart.filter(p=>p.id!==id);
  } else {
    item.qty = qty;
  }

  saveCart(cart);
  window.dispatchEvent(new Event("cartUpdated"));
}
