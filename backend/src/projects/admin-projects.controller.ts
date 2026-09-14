import { Controller, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/admin/projects')
export class AdminProjectsController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  create(@Body() data: any) {
    return this.prisma.project.create({ data });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prisma.project.delete({
      where: { id },
    });
  }

  // Media Management
  @Post(':id/media')
  addMedia(@Param('id') projectId: string, @Body() data: any) {
    return this.prisma.projectMedia.create({
      data: { ...data, projectId },
    });
  }

  @Patch('media/:mediaId')
  updateMedia(@Param('mediaId') id: string, @Body() data: any) {
    return this.prisma.projectMedia.update({
      where: { id },
      data,
    });
  }

  @Delete('media/:mediaId')
  removeMedia(@Param('mediaId') id: string) {
    return this.prisma.projectMedia.delete({
      where: { id },
    });
  }
}
