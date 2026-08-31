import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { SellerInfo, UserRole } from '@kickzone-workspace/entities';

@Injectable()
export class CatalogGuard implements CanActivate {
  constructor(
    @InjectRepository(SellerInfo)
    private readonly sellerInfoRepository: Repository<SellerInfo>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    const user = req.user;

    if (!user) {
      return false;
    }

    if (user.role === UserRole.ADMIN) {
      return true;
    }

    if (user.role === UserRole.SELLER) {
      const seller = await this.sellerInfoRepository.findOne({
        where: { user: { id: user.id } },
      });
      return seller?.canManageCatalog === true;
    }

    return false;
  }
}
