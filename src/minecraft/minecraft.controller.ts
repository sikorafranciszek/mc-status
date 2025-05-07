import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { MinecraftService } from './minecraft.service';

@Controller('minecraft')
export class MinecraftController {
  constructor(private readonly minecraftService: MinecraftService) {}

  @Get('status')
  async getStatus(@Query('ip') ip: string) {
    if (!ip) {
      throw new BadRequestException('Parametr "ip" jest wymagany');
    }
    return this.minecraftService.getServerStatus(ip);
  }
}
