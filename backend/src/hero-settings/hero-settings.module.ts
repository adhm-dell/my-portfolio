import { Module } from '@nestjs/common';
import { HeroSettingsService } from './hero-settings.service';
import { HeroSettingsController } from './hero-settings.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HeroSettingsController],
  providers: [HeroSettingsService],
})
export class HeroSettingsModule {}
