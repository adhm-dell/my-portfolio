import { Controller, Patch, Body, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/admin/profile')
export class AdminProfileController {
  constructor(private readonly prisma: PrismaService) {}

  @Patch(':id')
  updateProfile(@Param('id') id: string, @Body() data: any) {
    return this.prisma.siteProfile.update({
      where: { id },
      data,
    });
  }

  @Patch('about/:id')
  updateAbout(@Param('id') id: string, @Body() data: any) {
    return this.prisma.aboutContent.update({
      where: { id },
      data,
    });
  }
}
