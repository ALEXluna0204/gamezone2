const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Используем CORS для разрешения запросов с других доменов
app.use(cors());

// Middleware для обработки JSON в теле запроса
app.use(express.json());

// Настроим папку для статичных файлов (например, public)
app.use(express.static(path.join(__dirname, 'public')));

// Обработка POST-запроса на /submit-order
app.post('/submit-order', (req, res) => {
    const orderData = req.body;

    // Логируем информацию о заказе в требуемом формате
    console.log('Підтвердження замовлення');
    console.log('--------------------');
    console.log(`Ім'я клиента: ${orderData.customer.name}`);
    console.log(`Почта: ${orderData.customer.email}`);
    console.log(`Телефон: ${orderData.customer.phone}`);
    console.log(`Адреса доставки: ${orderData.customer.address}`);
    
    console.log('\nТовари на замовлення:');
    orderData.cartItems.forEach(item => {
        console.log(`${item.name} - ${item.quantity} шт. по ${item.price}₴`);
    });

    // Підраховуємо загальну суму
    let totalAmount = 0;
    orderData.cartItems.forEach(item => {
        totalAmount += item.price * item.quantity;
    });
    
    console.log(`\nЗагальна сума: ${totalAmount.toFixed(2)}₴`);

    // Отправляем успешный ответ
    res.json({
        message: 'Заказ успешно получен!',
        order: orderData,
    });
});

// Запуск сервера на порту 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
