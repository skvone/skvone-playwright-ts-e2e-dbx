import { Api } from './api';

export class OrdersApi extends Api {
  async createOrder(orderName: string) {
    const response = await this.request.post('/orders', {
      data: {
        name: orderName,
      },
    });
    return response;
  }

  async completeOrder(orderId: string) {
    const response = await this.request.post(`/orders/${orderId}/complete`);
    return response;
  }
}
