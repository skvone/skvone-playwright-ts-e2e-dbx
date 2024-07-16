import { Api } from './api';

export class PaymentsApi extends Api {
  async verifyPaymentMethod(paymentMethod: string) {
    const response = await this.request.get(`/payments/${paymentMethod}/verify`);
    return response;
  }
}
