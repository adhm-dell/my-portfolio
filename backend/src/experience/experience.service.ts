import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  async findAll(isFeatured?: boolean) {
    return this.prisma.experience.findMany({
      where: isFeatured !== undefined ? { isFeatured } : undefined,
      orderBy: { order: 'asc' }
    });
  }
}
