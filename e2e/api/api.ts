import { APIRequestContext } from '@playwright/test';

export class Api {
  protected request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
}
