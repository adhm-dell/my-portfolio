import { Module } from '@nestjs/common';
import { AboutFeaturesService } from './about-features.service';
import { AboutFeaturesController } from './about-features.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AboutFeaturesController],
  providers: [AboutFeaturesService],
})
export class AboutFeaturesModule {}
