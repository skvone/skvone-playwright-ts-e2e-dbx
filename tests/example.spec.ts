import { test as base } from '@playwright/test';
import { SharedApi } from '../src/sharedApi';
import { OrdersApi } from '../e2e/api/ordersApi';
import { ProjectApi } from '../e2e/api/projectApi';
import { OrdersUi } from '../e2e/ui/ordersUi';
import { PaymentsUi } from '../e2e/ui/paymentsUi';

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


export const test = apiUiFixtures;
export { expect } from '@playwright/test';
