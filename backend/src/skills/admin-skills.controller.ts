import { Controller, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/admin/skills')
export class AdminSkillsController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('categories')
  createCategory(@Body() data: any) {
    return this.prisma.skillCategory.create({ data });
  }

  @Patch('categories/:id')
  updateCategory(@Param('id') id: string, @Body() data: any) {
    return this.prisma.skillCategory.update({ where: { id }, data });
  }

  @Delete('categories/:id')
  removeCategory(@Param('id') id: string) {
    return this.prisma.skillCategory.delete({ where: { id } });
  }

  @Post('items')
  createSkill(@Body() data: any) {
    return this.prisma.skill.create({ data });
  }

  @Patch('items/:id')
  updateSkill(@Param('id') id: string, @Body() data: any) {
    return this.prisma.skill.update({ where: { id }, data });
  }

  @Delete('items/:id')
  removeSkill(@Param('id') id: string) {
    return this.prisma.skill.delete({ where: { id } });
  }
}
