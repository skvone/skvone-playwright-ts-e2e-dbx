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

    // Example of inserting data. In real scenarios, you might retrieve data differently
    await api.databricks.insertData(testParams);
    
    await ui.orders.openOrder('Sample Order');
    await ui.orders.completeOrder('Sample Order');
    await ui.orders.assertOrderIsCompleted('Sample Order');

    // Example of cleaning up data. It's recommended to use afterEach or similar hooks for cleanup
    await api.databricks.cleanupData(testParams);
  });
});
