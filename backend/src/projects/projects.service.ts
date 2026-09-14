import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.project.findMany({
      orderBy: { order: 'asc' },
      include: {
        media: {
          orderBy: { order: 'asc' }
        }
      }
    });
  }

  async findOne(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: { slug },
      include: {
        media: {
          orderBy: { order: 'asc' }
        }
      }
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }
}
