import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { ExperienceModule } from './experience/experience.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { PrismaModule } from './prisma/prisma.module';
import { PhilosophyModule } from './philosophy/philosophy.module';
import { AboutFeaturesModule } from './about-features/about-features.module';
import { HeroSettingsModule } from './hero-settings/hero-settings.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    ProfileModule, ProjectsModule, SkillsModule, ExperienceModule, ContactModule, AuthModule, UploadModule, PrismaModule, PhilosophyModule, AboutFeaturesModule, HeroSettingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
