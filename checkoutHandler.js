export async function submitOrder(orderData) {
    const response = await fetch('http://localhost:3000/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        throw new Error('API error');
    }
    return response.json();
}
