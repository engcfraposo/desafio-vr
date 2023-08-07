import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
  });

  afterEach(async () => {
    await prismaService.$disconnect();
  });

  it('should connect to PrismaClient on module initialization', async () => {
    prismaService.$connect = jest.fn();
    await prismaService.onModuleInit();
    expect(prismaService.$connect).toHaveBeenCalledTimes(1);
  });
});
