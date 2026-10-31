import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { PaymentResolver } from '@kickzone-workspace/resolvers';
import { CurrencyService } from '@kickzone-workspace/services';
import { AppModule } from './app.module';

/**
 * Compiles the real AppModule so Nest's DI graph is checked without a database.
 * Repository factories only need a DataSource-shaped object at construction time.
 */
describe('AppModule dependency graph', () => {
  jest.setTimeout(30000);

  it('constructs PaymentResolver with CurrencyService', async () => {
    const dataSource = {
      options: { type: 'postgres' },
      entityMetadatas: [],
      isInitialized: true,
      manager: {},
      initialize: jest.fn(),
      destroy: jest.fn(),
      getRepository: jest.fn().mockReturnValue({}),
      getTreeRepository: jest.fn(),
      getMongoRepository: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .compile();

    const resolver = moduleRef.get(PaymentResolver);
    const currencyService = moduleRef.get(CurrencyService);

    expect(resolver).toBeInstanceOf(PaymentResolver);
    expect(
      (resolver as unknown as { currencyService: CurrencyService })
        .currencyService
    ).toBe(currencyService);

    await moduleRef.close();
  });
});
