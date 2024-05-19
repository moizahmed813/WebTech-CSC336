document.getElementById('continue-shopping').addEventListener('click', () => {
    window.location.href = 'products.html';
});

document.getElementById('checkout').addEventListener('click', () => {
    document.getElementById('checkout-form').dispatchEvent(new Event('submit'));
});

const cartContainer = document.getElementById('cart-container');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('card', 'mb-3', 'card-horizontal');

        const cardBody = document.createElement('div');
        cardBody.classList.add('cart-body');

        const img = document.createElement('img');
                img.src = product.imageUrl;
                img.alt = product.name;
                img.classList.add('cart-img');
                cardBody.appendChild(img);

        const name = document.createElement('p');
        name.textContent = product.name;
        cardBody.appendChild(name);

        const category = document.createElement('p');
        category.textContent = `Category: ${product.category}`;
        cardBody.appendChild(category);

        const price = document.createElement('p');
        price.textContent = `Price: ${product.price}`;
        cardBody.appendChild(price);

        const quantityLabel = document.createElement('label');
        quantityLabel.textContent = 'Quantity:';
        cardBody.appendChild(quantityLabel);

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = product.quantity;
        quantityInput.min = 1;
        quantityInput.classList.add('form-control', 'quantity-input');
        quantityInput.addEventListener('change', (event) => updateQuantity(index, event.target.value));
        cardBody.appendChild(quantityInput);

        const totalPrice = document.createElement('p');
        totalPrice.textContent = `Total Price: $${(product.priceNumber * product.quantity).toFixed(2)}`;
        totalPrice.classList.add('total-price');
        cardBody.appendChild(totalPrice);

        const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove Item';
                removeButton.classList.add('btn', 'btn-danger', 'mt-3');
                removeButton.addEventListener('click', () => removeFromCart(index));
                cardBody.appendChild(removeButton);

        productCard.appendChild(cardBody);
        cartContainer.appendChild(productCard);
    });

    const grandTotal = document.createElement('p');
    grandTotal.textContent = `Grand Total: $${calculateGrandTotal().toFixed(2)}`;
    cartContainer.appendChild(grandTotal);
}

function updateQuantity(index, quantity) {
    if (quantity < 1) {
        quantity = 1;
    }
    cart[index].quantity = parseInt(quantity, 10);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function calculateGrandTotal() {
    return cart.reduce((total, product) => total + (product.priceNumber * product.quantity), 0);
}

renderCart();

document.getElementById('checkout-form').addEventListener('submit', (event) => {
    event.preventDefault();
    placeOrder();
});

function placeOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const deliveryInfo = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phoneNo: document.getElementById('phoneNo').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value
    };
    fetch('/api/orders/submit-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cart, deliveryInfo })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Order submitted successfully') {
            alert('Order placed successfully!');
            localStorage.removeItem('cart');
            window.location.href = 'cart.html'; 
        } else {
            alert('Error placing order. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error placing order:', error);
        alert('Error placing order. Please try again.');
    });
}