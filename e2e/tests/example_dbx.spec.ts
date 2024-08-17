import { test } from '../../src/test';

test.describe('Order tests', () => {
  test.beforeEach(async ({ api }) => {
    await api.project.createNewProject('New Project');
  });

  test('Complete order using UI and API', async ({ ui, api }) => {
    const testParams = {
      id: '1',
      name: 'Sample Order',
      tableType: 'orders',
      status: 'pending'
    };

    await api.databricks.insertData(testParams);
    await ui.orders.openOrder('Sample Order');
    await ui.orders.completeOrder('Sample Order');
    await ui.orders.assertOrderIsCompleted('Sample Order');
    await api.databricks.cleanupData(testParams);
  });
});