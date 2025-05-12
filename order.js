// order.js - Coffee ordering functionality for Coffee Shop Website

// Store available coffees with prices
const availableCoffees = {
    "Cappuccino": { price: 90, description: "Creamy espresso topped with frothed milk, served hot in a cup." },
    "Americano": { price: 69, description: "Strong espresso diluted with hot water, delivering a bold flavor profile." },
    "Espresso": { price: 49, description: "Robust, concentrated coffee brewed by forcing hot water through fine grounds." },
    "Macchiato": { price: 87, description: "Espresso with a splash of steamed milk; bold yet balanced." },
    "Mocha": { price: 62, description: "Espresso with chocolate and steamed milk; rich and indulgent." },
    "Coffee Latte": { price: 26, description: "Espresso with creamy steamed milk; smooth and comforting." },
    "Piccolo Latte": { price: 59, description: "Small latte with a strong espresso base, topped with a dollop." },
    "Ristretto": { price: 79, description: "Intensely flavored espresso shot with less water, offering a concentrated brew." },
    "Affogato": { price: 99, description: "Espresso poured over vanilla ice cream, creating a delightful coffee dessert." }
  };
  
  // Shopping cart to store orders
  let shoppingCart = [];
  
  // DOM ready function
  document.addEventListener('DOMContentLoaded', function() {
    initializeCoffeeOrderSystem();
  });
  
  function initializeCoffeeOrderSystem() {
    // Add "Order" buttons to each coffee card
    addOrderButtonsToCoffeeCards();
    
    // Add cart icon to header
    addCartToHeader();
    
    // Initialize event listeners for order functionality
    setupEventListeners();
  }
  
  function addOrderButtonsToCoffeeCards() {
    const coffeeCards = document.querySelectorAll('.section-3__card');
    
    coffeeCards.forEach(card => {
      // Get coffee name from the h3 element
      const coffeeName = card.querySelector('h3').textContent;
      
      // Create order button
      const orderButton = document.createElement('button');
      orderButton.className = 'coffee-order-btn';
      orderButton.textContent = 'Add to Cart';
      orderButton.dataset.coffee = coffeeName;
      
      // Style the button
      orderButton.style.backgroundColor = '#b68834';
      orderButton.style.color = '#fff';
      orderButton.style.border = 'none';
      orderButton.style.padding = '0.8rem 2rem';
      orderButton.style.borderRadius = '3rem';
      orderButton.style.fontFamily = 'inherit';
      orderButton.style.fontSize = '1.4rem';
      orderButton.style.cursor = 'pointer';
      orderButton.style.marginTop = '1.5rem';
      
      // Add button to card
      card.appendChild(orderButton);
    });
  }
  
  function addCartToHeader() {
    const nav = document.querySelector('.header-section__nav .navbar__links');
    const navMobile = document.querySelector('.header-section__nav-mobile .navbar__links-mobile');
    
    if (nav) {
      // Create cart item
      const cartItem = document.createElement('li');
      const cartLink = document.createElement('a');
      cartLink.href = '#';
      cartLink.className = 'white-clr cart-icon';
      cartLink.innerHTML = '<i class="fa-solid fa-shopping-cart"></i> <span class="cart-count">0</span>';
      cartItem.appendChild(cartLink);
      
      // Add to navigation
      nav.appendChild(cartItem);
    }
    
    if (navMobile) {
      // Create mobile cart item
      const cartItemMobile = document.createElement('li');
      const cartLinkMobile = document.createElement('a');
      cartLinkMobile.href = '#';
      cartLinkMobile.className = 'white-clr cart-icon';
      cartLinkMobile.innerHTML = '<i class="fa-solid fa-shopping-cart"></i> <span class="cart-count">0</span>';
      cartItemMobile.appendChild(cartLinkMobile);
      
      // Add to mobile navigation
      navMobile.appendChild(cartItemMobile);
    }
    
    // Create cart modal
    createCartModal();
  }
  
  function createCartModal() {
    // Create modal elements
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'cart-modal-overlay';
    modalOverlay.style.display = 'none';
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modalOverlay.style.zIndex = '1000';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'cart-modal';
    modalContent.style.position = 'fixed';
    modalContent.style.top = '50%';
    modalContent.style.left = '50%';
    modalContent.style.transform = 'translate(-50%, -50%)';
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.padding = '3rem';
    modalContent.style.borderRadius = '1rem';
    modalContent.style.width = '80%';
    modalContent.style.maxWidth = '60rem';
    modalContent.style.maxHeight = '80vh';
    modalContent.style.overflowY = 'auto';
    modalContent.style.color = '#222';
    modalContent.style.zIndex = '1001';
    
    // Modal header
    const modalHeader = document.createElement('div');
    modalHeader.style.display = 'flex';
    modalHeader.style.justifyContent = 'space-between';
    modalHeader.style.alignItems = 'center';
    modalHeader.style.marginBottom = '2rem';
    
    const modalTitle = document.createElement('h3');
    modalTitle.textContent = 'Your Coffee Order';
    modalTitle.style.color = '#341d0a';
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.className = 'close-modal-btn';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '3rem';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#341d0a';
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    
    // Cart items container
    const cartItemsContainer = document.createElement('div');
    cartItemsContainer.className = 'cart-items';
    
    // Cart summary
    const cartSummary = document.createElement('div');
    cartSummary.className = 'cart-summary';
    cartSummary.style.marginTop = '2rem';
    cartSummary.style.paddingTop = '2rem';
    cartSummary.style.borderTop = '1px solid #ddd';
    
    const totalAmount = document.createElement('div');
    totalAmount.className = 'total-amount';
    totalAmount.style.display = 'flex';
    totalAmount.style.justifyContent = 'space-between';
    totalAmount.style.fontSize = '1.8rem';
    totalAmount.style.fontWeight = '600';
    totalAmount.style.marginBottom = '2rem';
    
    totalAmount.innerHTML = '<span>Total:</span><span>$0</span>';
    
    // Order button
    const placeOrderBtn = document.createElement('button');
    placeOrderBtn.className = 'place-order-btn';
    placeOrderBtn.textContent = 'Place Order';
    placeOrderBtn.style.backgroundColor = '#b68834';
    placeOrderBtn.style.color = '#fff';
    placeOrderBtn.style.border = 'none';
    placeOrderBtn.style.padding = '1rem 2rem';
    placeOrderBtn.style.borderRadius = '3rem';
    placeOrderBtn.style.width = '100%';
    placeOrderBtn.style.fontSize = '1.6rem';
    placeOrderBtn.style.cursor = 'pointer';
    
    cartSummary.appendChild(totalAmount);
    cartSummary.appendChild(placeOrderBtn);
    
    // Assemble modal content
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(cartItemsContainer);
    modalContent.appendChild(cartSummary);
    
    // Add modal to body
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
  }
  
  function setupEventListeners() {
    // Add to cart button click event
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('coffee-order-btn')) {
        const coffeeName = event.target.dataset.coffee;
        addToCart(coffeeName);
      }
    });
    
    // Cart icon click event
    document.addEventListener('click', function(event) {
      if (event.target.closest('.cart-icon')) {
        event.preventDefault();
        toggleCartModal(true);
      }
    });
    
    // Close modal button click event
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('close-modal-btn')) {
        toggleCartModal(false);
      }
    });
    
    // Modal overlay click event (close when clicking outside)
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('cart-modal-overlay')) {
        toggleCartModal(false);
      }
    });
    
    // Place order button click event
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('place-order-btn')) {
        placeOrder();
      }
    });
    
    // Quantity change buttons
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('quantity-btn')) {
        const index = parseInt(event.target.dataset.index);
        const action = event.target.dataset.action;
        
        if (action === 'increase') {
          shoppingCart[index].quantity++;
        } else if (action === 'decrease' && shoppingCart[index].quantity > 1) {
          shoppingCart[index].quantity--;
        }
        
        updateCartDisplay();
      }
    });
    
    // Remove item button
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('remove-item-btn')) {
        const index = parseInt(event.target.dataset.index);
        shoppingCart.splice(index, 1);
        updateCartDisplay();
      }
    });
  }
  
  function addToCart(coffeeName) {
    if (availableCoffees[coffeeName]) {
      // Check if coffee already exists in cart
      const existingItemIndex = shoppingCart.findIndex(item => item.name === coffeeName);
      
      if (existingItemIndex !== -1) {
        // Increase quantity if already in cart
        shoppingCart[existingItemIndex].quantity++;
      } else {
        // Add new item to cart
        shoppingCart.push({
          name: coffeeName,
          price: availableCoffees[coffeeName].price,
          quantity: 1
        });
      }
      
      // Update cart display
      updateCartDisplay();
      
      // Show brief notification
      showAddToCartNotification(coffeeName);
    }
  }
  
  function updateCartDisplay() {
    // Update cart count
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = shoppingCart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
      element.textContent = totalItems;
    });
    
    // Update cart items in modal
    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = '';
      
      if (shoppingCart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>';
      } else {
        shoppingCart.forEach((item, index) => {
          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item';
          cartItem.style.display = 'flex';
          cartItem.style.justifyContent = 'space-between';
          cartItem.style.alignItems = 'center';
          cartItem.style.marginBottom = '1.5rem';
          cartItem.style.padding = '1rem';
          cartItem.style.backgroundColor = '#f9f9f9';
          cartItem.style.borderRadius = '0.5rem';
          
          const itemDetails = document.createElement('div');
          itemDetails.className = 'item-details';
          
          const itemName = document.createElement('h4');
          itemName.textContent = item.name;
          itemName.style.marginBottom = '0.5rem';
          
          const itemPrice = document.createElement('p');
          itemPrice.textContent = `$${item.price}`;
          
          itemDetails.appendChild(itemName);
          itemDetails.appendChild(itemPrice);
          
          const itemControls = document.createElement('div');
          itemControls.className = 'item-controls';
          itemControls.style.display = 'flex';
          itemControls.style.alignItems = 'center';
          
          const quantityControl = document.createElement('div');
          quantityControl.className = 'quantity-control';
          quantityControl.style.display = 'flex';
          quantityControl.style.alignItems = 'center';
          quantityControl.style.marginRight = '1.5rem';
          
          const decreaseBtn = document.createElement('button');
          decreaseBtn.textContent = '-';
          decreaseBtn.className = 'quantity-btn';
          decreaseBtn.dataset.action = 'decrease';
          decreaseBtn.dataset.index = index;
          decreaseBtn.style.width = '2.5rem';
          decreaseBtn.style.height = '2.5rem';
          decreaseBtn.style.border = 'none';
          decreaseBtn.style.background = '#ddd';
          decreaseBtn.style.borderRadius = '50%';
          decreaseBtn.style.cursor = 'pointer';
          
          const quantityDisplay = document.createElement('span');
          quantityDisplay.textContent = item.quantity;
          quantityDisplay.style.margin = '0 1rem';
          quantityDisplay.style.fontSize = '1.6rem';
          
          const increaseBtn = document.createElement('button');
          increaseBtn.textContent = '+';
          increaseBtn.className = 'quantity-btn';
          increaseBtn.dataset.action = 'increase';
          increaseBtn.dataset.index = index;
          increaseBtn.style.width = '2.5rem';
          increaseBtn.style.height = '2.5rem';
          increaseBtn.style.border = 'none';
          increaseBtn.style.background = '#ddd';
          increaseBtn.style.borderRadius = '50%';
          increaseBtn.style.cursor = 'pointer';
          
          quantityControl.appendChild(decreaseBtn);
          quantityControl.appendChild(quantityDisplay);
          quantityControl.appendChild(increaseBtn);
          
          const removeBtn = document.createElement('button');
          removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
          removeBtn.className = 'remove-item-btn';
          removeBtn.dataset.index = index;
          removeBtn.style.background = 'none';
          removeBtn.style.border = 'none';
          removeBtn.style.color = '#222';
          removeBtn.style.fontSize = '1.6rem';
          removeBtn.style.cursor = 'pointer';
          
          itemControls.appendChild(quantityControl);
          itemControls.appendChild(removeBtn);
          
          const itemSubtotal = document.createElement('div');
          itemSubtotal.className = 'item-subtotal';
          itemSubtotal.textContent = `$${item.price * item.quantity}`;
          itemSubtotal.style.fontSize = '1.6rem';
          itemSubtotal.style.fontWeight = '600';
          itemSubtotal.style.minWidth = '8rem';
          itemSubtotal.style.textAlign = 'right';
          
          cartItem.appendChild(itemDetails);
          cartItem.appendChild(itemControls);
          cartItem.appendChild(itemSubtotal);
          
          cartItemsContainer.appendChild(cartItem);
        });
      }
    }
    
    // Update total amount
    const totalAmountElement = document.querySelector('.total-amount span:last-child');
    if (totalAmountElement) {
      const totalAmount = shoppingCart.reduce((total, item) => total + (item.price * item.quantity), 0);
      totalAmountElement.textContent = `$${totalAmount}`;
    }
  }
  
  function toggleCartModal(show) {
    const modalOverlay = document.querySelector('.cart-modal-overlay');
    if (modalOverlay) {
      modalOverlay.style.display = show ? 'block' : 'none';
    }
  }
  
  function showAddToCartNotification(coffeeName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'add-to-cart-notification';
    notification.textContent = `Added ${coffeeName} to cart`;
    notification.style.position = 'fixed';
    notification.style.bottom = '2rem';
    notification.style.right = '2rem';
    notification.style.backgroundColor = '#b68834';
    notification.style.color = '#fff';
    notification.style.padding = '1.5rem 2.5rem';
    notification.style.borderRadius = '0.5rem';
    notification.style.zIndex = '999';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(2rem)';
    notification.style.transition = 'all 0.3s ease-in-out';
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove notification after delay
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(2rem)';
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
  
  function placeOrder() {
    if (shoppingCart.length === 0) {
      alert('Your cart is empty. Please add some coffee first.');
      return;
    }
    
    // Calculate order details
    const totalItems = shoppingCart.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = shoppingCart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Create order summary
    let orderSummary = `Order Placed Successfully!\n\n`;
    orderSummary += `Number of Items: ${totalItems}\n`;
    orderSummary += `Total Amount: $${totalAmount}\n\n`;
    orderSummary += `Order Details:\n`;
    
    shoppingCart.forEach(item => {
      orderSummary += `- ${item.name} (${item.quantity}) - $${item.price * item.quantity}\n`;
    });
    
    orderSummary += `\nThank you for your order!`;
    
    // Show order confirmation
    alert(orderSummary);
    
    // Reset cart
    shoppingCart = [];
    updateCartDisplay();
    
    // Close modal
    toggleCartModal(false);
    
    // Show success message
    showOrderSuccessMessage();
  }
  
  function showOrderSuccessMessage() {
    // Create success message overlay
    const successOverlay = document.createElement('div');
    successOverlay.className = 'success-overlay';
    successOverlay.style.position = 'fixed';
    successOverlay.style.top = '0';
    successOverlay.style.left = '0';
    successOverlay.style.width = '100%';
    successOverlay.style.height = '100%';
    successOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    successOverlay.style.display = 'flex';
    successOverlay.style.justifyContent = 'center';
    successOverlay.style.alignItems = 'center';
    successOverlay.style.zIndex = '2000';
    
    const successContent = document.createElement('div');
    successContent.className = 'success-content';
    successContent.style.backgroundColor = '#fff';
    successContent.style.padding = '4rem';
    successContent.style.borderRadius = '1rem';
    successContent.style.textAlign = 'center';
    successContent.style.maxWidth = '50rem';
    successContent.style.width = '90%';
    
    const successIcon = document.createElement('div');
    successIcon.innerHTML = '<i class="fa-solid fa-check-circle"></i>';
    successIcon.style.fontSize = '5rem';
    successIcon.style.color = '#4CAF50';
    successIcon.style.marginBottom = '2rem';
    
    const successTitle = document.createElement('h2');
    successTitle.textContent = 'Order Placed Successfully!';
    successTitle.style.color = '#341d0a';
    successTitle.style.marginBottom = '1.5rem';
    
    const successMessage = document.createElement('p');
    successMessage.textContent = 'Your coffee will be prepared shortly. Thank you for your order!';
    successMessage.style.fontSize = '1.6rem';
    successMessage.style.color = '#666';
    successMessage.style.marginBottom = '3rem';
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Continue Shopping';
    closeButton.className = 'continue-shopping-btn';
    closeButton.style.backgroundColor = '#b68834';
    closeButton.style.color = '#fff';
    closeButton.style.border = 'none';
    closeButton.style.padding = '1rem 3rem';
    closeButton.style.borderRadius = '3rem';
    closeButton.style.fontSize = '1.6rem';
    closeButton.style.cursor = 'pointer';
    
    successContent.appendChild(successIcon);
    successContent.appendChild(successTitle);
    successContent.appendChild(successMessage);
    successContent.appendChild(closeButton);
    
    successOverlay.appendChild(successContent);
    document.body.appendChild(successOverlay);
    
    // Close button event
    closeButton.addEventListener('click', function() {
      document.body.removeChild(successOverlay);
    });
  }