import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HeroSettingsService {
  constructor(private prisma: PrismaService) {}

  async getSettings() {
    const settings = await this.prisma.heroSettings.findFirst();
    if (!settings) {
      return this.prisma.heroSettings.create({
        data: {
          terminalCodeEn: '// Default code here',
          terminalCodeAr: '// Default code here (ar)',
          projectTitleEn: 'Default Project',
          projectTitleAr: 'مشروع افتراضي',
          projectDescEn: 'A default description',
          projectDescAr: 'وصف افتراضي',
          projectTagsEn: ['React', 'Node'],
          projectTagsAr: ['رياكت', 'نود'],
          projectLink: '#',
        }
      });
    }
    return settings;
  }

  async updateSettings(data: any) {
    const settings = await this.getSettings();
    return this.prisma.heroSettings.update({
      where: { id: settings.id },
      data,
    });
  }
}
