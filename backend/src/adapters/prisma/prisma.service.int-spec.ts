import { PrismaService } from './prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCardDto } from 'src/cards/dto/create-card.dto';
import { v4 as uuid } from 'uuid';

const mockCreateCardDto: CreateCardDto = {
  id: uuid(),
  number: '0000 0000 0000 0000',
  cvv: '123',
  name: 'John Doe',
  validDate: '12/24'
};

describe('PrismaService', ()=>{
  let prismaService: PrismaService;
  beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
          providers:[PrismaService],
      }).compile();

      prismaService = module.get<PrismaService>(PrismaService)
  })
  beforeEach(async () => {
      await prismaService.card.deleteMany();
    });

    afterEach(async () => {
      await prismaService.card.deleteMany();
    });

    describe("$connect", ()=>{
      it("should connect to database", async()=>{
        await expect(prismaService.onModuleInit()).resolves.toBeUndefined()
      })
    })
    describe("create", ()=>{
      it('should create a new card', async () => {
        const result = await prismaService.card.create({
          data:mockCreateCardDto,
        });

        expect(result).toHaveProperty('id');
        expect(result.number).toBe(mockCreateCardDto.number);
        expect(result.cvv).toBe(mockCreateCardDto.cvv);
        expect(result.name).toBe(mockCreateCardDto.name);
      });
    })

    describe("findUnique", ()=>{
      it('should find a card with id', async () => {
        await prismaService.card.create({
          data:mockCreateCardDto,
        });

        const result = await prismaService.card.findUnique({
          where: { id: mockCreateCardDto.id}
        })

        expect(result).toHaveProperty('id');
        expect(result.number).toBe(mockCreateCardDto.number);
        expect(result.cvv).toBe(mockCreateCardDto.cvv);
        expect(result.name).toBe(mockCreateCardDto.name);
      });

      it('should receive null with id', async () => {
        await prismaService.card.create({
          data:mockCreateCardDto,
        });

        const result = await prismaService.card.findUnique({
          where: { id: mockCreateCardDto.id}
        })

        expect(result).toHaveProperty('id');
        expect(result.number).toBe(mockCreateCardDto.number);
        expect(result.cvv).toBe(mockCreateCardDto.cvv);
        expect(result.name).toBe(mockCreateCardDto.name);
      });

      it('should find a card with number', async () => {
        await prismaService.card.create({
          data:mockCreateCardDto,
        });

        const result = await prismaService.card.findUnique({
          where: { number: mockCreateCardDto.number}
        })

        expect(result).toHaveProperty('id');
        expect(result.number).toBe(mockCreateCardDto.number);
        expect(result.cvv).toBe(mockCreateCardDto.cvv);
        expect(result.name).toBe(mockCreateCardDto.name);
      });

      it('should receive null with number', async () => {
        await prismaService.card.create({
          data:mockCreateCardDto,
        });

        const result = await prismaService.card.findUnique({
          where: { number: mockCreateCardDto.number}
        })

        expect(result).toHaveProperty('id');
        expect(result.number).toBe(mockCreateCardDto.number);
        expect(result.cvv).toBe(mockCreateCardDto.cvv);
        expect(result.name).toBe(mockCreateCardDto.name);
      });
    })
    describe("update", ()=>{
      it("should update a card", async()=> {
        const card = await prismaService.card.create({
          data:mockCreateCardDto,
        });
        const updateCard = {...card, name: "Jane Doe" }
        const result = await prismaService.card.update({
          where:{ id: card.id },
          data: updateCard,
        })
          expect(result).toStrictEqual(updateCard);
      })
    })

    describe("delete", ()=>{
      it("should delete a card", async()=> {
        const card = await prismaService.card.create({
          data:mockCreateCardDto,
        });
        const result = await prismaService.card.delete({
          where:{ id: card.id },
        })
          expect(result).toStrictEqual(card);
      })
    })
})
