// Отримуємо корзину з localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функція для відображення товарів у кошику
function renderCheckoutCartItems() {
    const checkoutCartItemsContainer = document.getElementById('checkout-cart-items');
    checkoutCartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        checkoutCartItemsContainer.innerHTML = '<p>Ваш кошик пустий.</p>';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.price}₴ × ${item.quantity} = ${itemTotal.toFixed(2)}₴</p>
        `;
        checkoutCartItemsContainer.appendChild(cartItem);
    });

    const totalAmount = document.createElement('div');
    totalAmount.className = 'total-amount';
    totalAmount.innerHTML = `<h3>До оплати: ${total.toFixed(2)}₴</h3>`;
    checkoutCartItemsContainer.appendChild(totalAmount);
}

// Обробник відправки форми
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const orderData = {
        customer: {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
        },
        cartItems: cart,
    };

    console.log(orderData);

    fetch('http://localhost:3000/submit-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Помилка при надсиланні замовлення');
            }
        })
        .then(data => {
            alert('Замовлення успішно надіслано!');
            console.log('Відповідь сервера:', data);
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Помилка:', error);
            alert('Виникла помилка при оформленні замовлення. Спробуйте пізніше.');
        });
});

window.addEventListener('load', renderCheckoutCartItems);
