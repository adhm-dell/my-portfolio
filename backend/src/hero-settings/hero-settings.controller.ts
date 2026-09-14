import { Controller, Get, Body, Patch, UseGuards } from '@nestjs/common';
import { HeroSettingsService } from './hero-settings.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('api/v1/hero-settings')
export class HeroSettingsController {
  constructor(private readonly heroSettingsService: HeroSettingsService) {}

  @Get()
  getSettings() {
    return this.heroSettingsService.getSettings();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateSettings(@Body() updateDto: any) {
    return this.heroSettingsService.updateSettings(updateDto);
  }
}
