import { test } from '../../src/test';

test.describe('Order tests', () => {
  test.beforeEach(async ({ api }) => {
    await api.project.createNewProject('New Project');
  });

  test('Complete order using UI and API', async ({ ui, api }) => {
    await api.orders.createOrder('Sample Order');
    await ui.orders.openOrder('Sample Order');
    await ui.orders.completeOrder('Sample Order');
    await ui.orders.assertOrderIsCompleted('Sample Order');
  });

  test('Add new payment method and verify transaction', async ({ ui, api }) => {
    await ui.payments.clickAddNewPaymentButton();
    await ui.payments.setUpPaymentMethod('creditcard');
    await ui.payments.fillPaymentField('4111111111111111');
    await ui.payments.submitPayment();
    await api.payments.verifyPaymentMethod('creditcard');
  });
});
