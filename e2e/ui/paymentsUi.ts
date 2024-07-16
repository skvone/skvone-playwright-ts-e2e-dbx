import { Page } from '@playwright/test';
import { Ui } from './ui';

export class PaymentsUi extends Ui {
  constructor(page: Page) {
    super(page);
  }

  private buttonAddNewPayment = () => this.page.getByTestId('add-new-method');
  private buttonSetUp = (paymentMethod: string) => this.page.getByTestId(paymentMethod.toUpperCase());
  private fieldPayments = () => this.page.getByTestId('textinput-wrap');
  private submitPaymentButton = () => this.page.getByTestId('submit-payment');

  async clickAddNewPaymentButton() {
    await this.buttonAddNewPayment().click();
  }

  async setUpPaymentMethod(paymentMethod: string) {
    await this.buttonSetUp(paymentMethod).click();
  }

  async fillPaymentField(value: string) {
    await this.fieldPayments().fill(value);
  }

  async submitPayment() {
    await this.submitPaymentButton().click();
  }
}
