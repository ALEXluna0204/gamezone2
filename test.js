const submitOrder = require('../components/checkoutForm');
const orderService = require('../services/orderService');

// Створюємо Mock для сервісу
jest.mock('../orderService');

describe('Checkout Form Integration Tests', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Очищення викликів mock-об'єкта після кожного тесту
    });

    test('TC-01: Successful order submission with valid data', async () => {
        // Налаштовуємо Mock для повернення успішної відповіді
        orderService.submitOrder.mockResolvedValue({
            status: 200,
            message: 'Order confirmed',
        });

        const orderData = {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+123456789',
            address: '123 Main Street',
            items: [{ id: 1, name: 'Laptop', price: 1200, quantity: 1 }],
        };

        const response = await submitOrder(orderData);

        expect(orderService.submitOrder).toHaveBeenCalledTimes(1);
        expect(orderService.submitOrder).toHaveBeenCalledWith(orderData);
        expect(response).toEqual({ status: 200, message: 'Order confirmed' });
    });

    test('TC-02: Failed order submission with invalid data', async () => {
        // Налаштовуємо Mock для повернення помилки
        orderService.submitOrder.mockRejectedValue(new Error('Invalid data'));

        const orderData = {
            name: '',
            email: 'invalid-email',
            phone: '',
            address: '',
            items: [],
        };

        await expect(submitOrder(orderData)).rejects.toThrow('Failed to submit order');

        expect(orderService.submitOrder).toHaveBeenCalledTimes(1);
        expect(orderService.submitOrder).toHaveBeenCalledWith(orderData);
    });

    test('TC-03: Ensure order submission is called with correct data', async () => {
        // Mock, який перевіряє лише факт виклику функції
        orderService.submitOrder.mockResolvedValue({
            status: 200,
            message: 'Order confirmed',
        });

        const orderData = {
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+987654321',
            address: '456 Side Street',
            items: [{ id: 2, name: 'Mouse', price: 50, quantity: 2 }],
        };

        await submitOrder(orderData);

        expect(orderService.submitOrder).toHaveBeenCalledTimes(1);
        expect(orderService.submitOrder).toHaveBeenCalledWith(orderData);
    });
});
