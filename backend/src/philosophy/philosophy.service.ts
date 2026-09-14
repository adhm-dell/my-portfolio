import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PhilosophyService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.philosophyCard.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.philosophyCard.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.prisma.philosophyCard.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.philosophyCard.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.philosophyCard.delete({ where: { id } });
  }

  async reorder(orderedIds: string[]) {
    const transaction = orderedIds.map((id, index) =>
      this.prisma.philosophyCard.update({
        where: { id },
        data: { order: index },
      }),
    );
    return this.prisma.$transaction(transaction);
  }
}
