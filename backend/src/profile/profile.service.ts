import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile() {
    const profile = await this.prisma.siteProfile.findFirst();
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async getAboutContent() {
    return this.prisma.aboutContent.findMany({
      orderBy: { order: 'asc' },
    });
  }
}
