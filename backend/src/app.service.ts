import { Injectable } from '@nestjs/common';

export interface ApiStatus {
  name: string;
  status: string;
}

@Injectable()
export class AppService {
  getStatus(): ApiStatus {
    return { name: 'SIGFIS API', status: 'ok' };
  }
}
