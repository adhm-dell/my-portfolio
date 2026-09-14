import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AboutFeaturesService } from './about-features.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('api/v1/about-features')
export class AboutFeaturesController {
  constructor(private readonly aboutFeaturesService: AboutFeaturesService) {}

  @Get()
  findAll() {
    return this.aboutFeaturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutFeaturesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDto: any) {
    return this.aboutFeaturesService.create(createDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('reorder')
  reorder(@Body('orderedIds') orderedIds: string[]) {
    return this.aboutFeaturesService.reorder(orderedIds);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.aboutFeaturesService.update(id, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutFeaturesService.remove(id);
  }
}
