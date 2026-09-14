import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PhilosophyService } from './philosophy.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('api/v1/philosophy')
export class PhilosophyController {
  constructor(private readonly philosophyService: PhilosophyService) {}

  @Get()
  findAll() {
    return this.philosophyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.philosophyService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDto: any) {
    return this.philosophyService.create(createDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('reorder')
  reorder(@Body('orderedIds') orderedIds: string[]) {
    return this.philosophyService.reorder(orderedIds);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.philosophyService.update(id, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.philosophyService.remove(id);
  }
}
