import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private readonly apiBaseUrl = 'https://localhost:7062/';

  constructor() {}

  getApiBaseUrl(): string {
    return this.apiBaseUrl;
  }
}
