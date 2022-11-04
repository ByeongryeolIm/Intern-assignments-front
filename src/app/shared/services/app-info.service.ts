import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return '영화예매시스템';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
