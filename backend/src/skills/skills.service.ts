import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  async findAll(isFeatured?: boolean) {
    return this.prisma.skillCategory.findMany({
      where: isFeatured !== undefined ? { isFeatured } : undefined,
      orderBy: { order: 'asc' },
      include: {
        skills: {
          orderBy: { order: 'asc' }
        }
      }
    });
  }
}
