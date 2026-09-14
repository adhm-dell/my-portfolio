import { Controller, Get, Query } from '@nestjs/common';
import { SkillsService } from './skills.service';

@Controller('api/v1/skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  findAll(@Query('featured') featured?: string) {
    const isFeatured = featured === 'true';
    return this.skillsService.findAll(featured ? isFeatured : undefined);
  }
}
