import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { AdminExperienceController } from './admin-experience.controller';

@Module({
  controllers: [ExperienceController, AdminExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}
