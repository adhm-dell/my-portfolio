import { Controller, Get } from '@nestjs/common';
import { SkillsService } from './skills.service';

@Controller('api/v1/skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  findAll() {
    return this.skillsService.findAll();
  }
}
