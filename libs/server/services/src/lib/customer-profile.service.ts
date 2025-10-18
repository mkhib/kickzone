import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerProfile } from '@kickzone-workspace/entities';

export interface UpdateCustomerProfileInput {
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

@Injectable()
export class CustomerProfileService {
  constructor(
    @InjectRepository(CustomerProfile)
    private readonly customerProfileRepository: Repository<CustomerProfile>
  ) {}

  async getOrCreateProfile(userId: string): Promise<CustomerProfile> {
    let profile = await this.customerProfileRepository.findOne({
      where: { userId },
    });

    if (!profile) {
      profile = this.customerProfileRepository.create({ userId });
      profile = await this.customerProfileRepository.save(profile);
    }

    return profile;
  }

  async updateProfile(
    userId: string,
    input: UpdateCustomerProfileInput
  ): Promise<CustomerProfile> {
    const profile = await this.getOrCreateProfile(userId);

    Object.assign(profile, {
      phone: input.phone ?? profile.phone,
      address: input.address ?? profile.address,
      city: input.city ?? profile.city,
      state: input.state ?? profile.state,
      zipCode: input.zipCode ?? profile.zipCode,
      country: input.country ?? profile.country,
    });

    return this.customerProfileRepository.save(profile);
  }

  async getProfile(userId: string): Promise<CustomerProfile | null> {
    return this.customerProfileRepository.findOne({
      where: { userId },
    });
  }
}
