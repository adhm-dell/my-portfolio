import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { AdminProfileController } from './admin-profile.controller';

@Module({
  controllers: [ProfileController, AdminProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
