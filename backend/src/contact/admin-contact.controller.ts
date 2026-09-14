import { Controller, Get, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/admin/contact')
export class AdminContactController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.prisma.contactMessage.update({
      where: { id },
      data: { isRead: true }
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prisma.contactMessage.delete({ where: { id } });
  }
}
