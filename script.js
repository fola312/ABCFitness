document.addEventListener('DOMContentLoaded', () => {
  // --- STORAGE INITIALIZATION ---
  let cart = JSON.parse(sessionStorage.getItem('abc_cart')) || [];
  const cartModal = document.querySelector('#cartModal');
  const cartItemsList = document.querySelector('#cartItemsList');

  // --- TASK 3.2: SESSION STORAGE (Gallery) ---
  // Add to Cart 
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const product = e.target.closest('td').querySelector('p').innerText;
      cart.push(product);
      sessionStorage.setItem('abc_cart', JSON.stringify(cart));
      alert(product + " added to cart.");
    });
  });

  // View Cart Modal [cite: 6, 15]
  const viewCartBtn = document.querySelector('#view-cart-btn');
  if (viewCartBtn) {
    viewCartBtn.onclick = () => {
      cartItemsList.innerHTML = cart.length ? '' : '<li>Empty</li>';
      cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        cartItemsList.appendChild(li);
      });
      cartModal.style.display = 'block';
    };
  }

  // --- Task 3.2 & 4: Clear Cart Logic ---
  const clearCartBtn = document.querySelector('#clear-cart');
  if (clearCartBtn) {
    clearCartBtn.onclick = () => {
      sessionStorage.removeItem('abc_cart');
      cart = []; // Reset local variable
      if (cartItemsList) cartItemsList.innerHTML = '<li>Empty</li>';
      alert("Cart is cleared!"); // Required for Template Page 14
    };
  }

  // --- Task 3.2 & 4: Process Order Logic with State Check ---
  const processOrderBtn = document.querySelector('#process-order');
  if (processOrderBtn) {
    processOrderBtn.onclick = () => {
      // Check if there is actually anything in the cart
      if (cart.length === 0) {
        alert("Shopping cart—Process Order (alert after the order is already processed)"); // Required for Template Page 15
      } else {
        alert("Thank you for your order!"); // Required for Template Page 15
        sessionStorage.removeItem('abc_cart');
        cart = []; // Reset local variable
        if (cartItemsList) cartItemsList.innerHTML = '<li>Empty</li>';
      }
    };
  }
  if (document.querySelector('#closeModal')) document.querySelector('#closeModal').onclick = () => cartModal.style.display = 'none';

  /* --- Contact Form Logic (About Us Page) --- */
  const contactForm = document.querySelector('#contact-form'); // Ensure this ID matches your HTML

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // 1. Grab the name from the input field
      const firstName = document.querySelector('#first-name').value; // Ensure this ID matches your HTML
      const email = document.querySelector('#email').value;
      const message = document.querySelector('#message').value;

      // 2. Save the object to localStorage [cite: 91]
      const contactData = { user: firstName, email: email, msg: message };
      localStorage.setItem('last_abc_order', JSON.stringify(contactData));

      // 3. The FIXED personalized alert 
      alert("Thank you for your message, " + firstName + "!");
    });
  }
});
/* --- Class Booking Logic (Custom Page) --- */
const bookButtons = document.querySelectorAll('.book-now-btn'); // Add this class to your "Book Now" buttons/links

bookButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    // Get the class name from the table row (assuming it's in the same row)
    const row = button.closest('tr');
    const className = row.cells[2].innerText; // Grab the 3rd column text (Class Name) [cite: 297]

    // Save to localStorage [cite: 93, 94]
    localStorage.setItem('booked_class', className);

    alert("Spot reserved for: " + className + "! We'll see you at the studio.");
  });
});
