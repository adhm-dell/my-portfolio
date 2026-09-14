import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('api/v1/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile() {
    return this.profileService.getProfile();
  }

  @Get('about')
  getAboutContent() {
    return this.profileService.getAboutContent();
  }
}
