import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  apiInfo(): string {
    return 'API for Minecraft server status';
  }
}
