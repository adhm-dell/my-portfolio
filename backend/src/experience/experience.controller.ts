import { Controller, Get, Query } from '@nestjs/common';
import { ExperienceService } from './experience.service';

@Controller('api/v1/experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  findAll(@Query('featured') featured?: string) {
    const isFeatured = featured === 'true';
    return this.experienceService.findAll(featured ? isFeatured : undefined);
  }
}
