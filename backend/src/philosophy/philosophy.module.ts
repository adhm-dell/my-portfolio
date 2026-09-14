import { Module } from '@nestjs/common';
import { PhilosophyService } from './philosophy.service';
import { PhilosophyController } from './philosophy.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PhilosophyController],
  providers: [PhilosophyService],
})
export class PhilosophyModule {}
