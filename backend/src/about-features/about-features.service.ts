import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AboutFeaturesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.aboutFeature.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.aboutFeature.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.prisma.aboutFeature.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.aboutFeature.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.aboutFeature.delete({ where: { id } });
  }

  async reorder(orderedIds: string[]) {
    const transaction = orderedIds.map((id, index) =>
      this.prisma.aboutFeature.update({
        where: { id },
        data: { order: index },
      }),
    );
    return this.prisma.$transaction(transaction);
  }
}
