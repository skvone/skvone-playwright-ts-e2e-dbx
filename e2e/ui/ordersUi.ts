import { expect, Page } from '@playwright/test';
import { Ui } from './ui';

export class OrdersUi extends Ui {
  constructor(page: Page) {
    super(page);
  }

  async openOrder(orderName: string) {
    await this.page.click(`text=${orderName}`);
  }

  async completeOrder(orderName: string) {
    await this.openOrder(orderName);
    await this.page.click('button.complete-order');
  }

  async assertOrderIsCompleted(orderName: string) {
    const order = await this.page.isVisible(`text=${orderName}`);
    expect(order).toBeFalsy();
  }
}
