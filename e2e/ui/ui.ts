import { Page } from '@playwright/test';

export class Ui {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
