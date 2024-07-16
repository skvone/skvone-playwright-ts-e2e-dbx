import { test as base } from '@playwright/test';
import { SharedApi } from '../src/sharedApi';
import { OrdersApi } from './api/ordersApi';
import { ProjectApi } from './api/projectApi';
import { OrdersUi } from './ui/ordersUi';
import { PaymentsUi } from './ui/paymentsUi';

// Определение фикстур API и UI
export const apiUiFixtures = base.extend<{
  api: {
    shared: SharedApi;
    orders: OrdersApi;
    project: ProjectApi;
  };
  ui: {
    orders: OrdersUi;
    payments: PaymentsUi;
  };
}>({
  api: async ({ request }, use) => {
    await use({
      shared: new SharedApi(request),
      orders: new OrdersApi(request),
      project: new ProjectApi(request),
    });
  },
  ui: async ({ page, api }, use) => {
    await use({
      orders: new OrdersUi({ page, api: api.orders }),
      payments: new PaymentsUi({ page, api: api.project }),
    });
  },
});
