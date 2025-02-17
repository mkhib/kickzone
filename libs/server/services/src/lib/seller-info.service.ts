import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellerInfo } from '@kickzone-workspace/entities';
import {
  CreateSellerInput,
  UpdateSellerInput,
} from '@kickzone-workspace/inputs';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(SellerInfo)
    private sellerRepository: Repository<SellerInfo>
  ) {}

  create(createSellerInput: CreateSellerInput): Promise<SellerInfo> {
    const newSeller = this.sellerRepository.create(createSellerInput);
    return this.sellerRepository.save(newSeller);
  }

  findAll(): Promise<SellerInfo[]> {
    return this.sellerRepository.find();
  }

  findOne(id: number): Promise<SellerInfo | null> {
    return this.sellerRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateSellerInput: UpdateSellerInput
  ): Promise<SellerInfo | null> {
    await this.sellerRepository.update(id, updateSellerInput);
    return this.findOne(id);
  }
}
