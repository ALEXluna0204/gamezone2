import { expect } from 'chai';
import sinon from 'sinon';
import { submitOrder } from './checkoutHandler.js';

describe('Тести для submitOrder', () => {
    it('Повинен викликати fetch з правильними параметрами', async () => {
        const fakeFetch = sinon.stub(global, 'fetch').resolves({
            ok: true,
            json: async () => ({ success: true }),
        });

        const orderData = { name: 'Test', email: 'test@example.com' };
        const response = await submitOrder(orderData);

        expect(fakeFetch.calledOnce).to.be.true;
        expect(fakeFetch.firstCall.args[0]).to.equal('http://localhost:3000/submit-order');
        expect(response).to.deep.equal({ success: true });

        fakeFetch.restore();
    });
});
