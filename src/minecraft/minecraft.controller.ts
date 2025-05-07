import { Controller, Get, Query, BadRequestException, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { MinecraftService } from './minecraft.service';

@Controller('minecraft')
@UseInterceptors(CacheInterceptor)
export class MinecraftController {
  constructor(private readonly minecraftService: MinecraftService) {}

  @Get('status')
  @CacheKey('minecraft-status')
  @CacheTTL(10)
  async getStatus(@Query('ip') ip: string) {
    if (!ip) {
      throw new BadRequestException('Parametr "ip" jest wymagany');
    }
    return this.minecraftService.getServerStatus(ip);
  }
}
