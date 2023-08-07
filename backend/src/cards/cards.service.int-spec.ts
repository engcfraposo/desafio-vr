import { CardsService } from "./cards.service";
import { PrismaService } from "src/adapters/prisma/prisma.service";
import { v4 as uuid } from 'uuid';
import { CreateCardDto } from "./dto/create-card.dto";
import { PrismaModule } from "src/adapters/prisma/prisma.module";
import { Test, TestingModule } from "@nestjs/testing";
import { ConflictException, NotFoundException } from "@nestjs/common";

const mockCreateCardDto: CreateCardDto = {
    id: uuid(),
    number: '0000 0000 0000 0000',
    cvv: '123',
    name: 'John Doe',
    validDate: '12/24'
  };

describe('CardsService', ()=>{
    let prismaService: PrismaService;
    let cardsService: CardsService;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports:[PrismaModule],
            providers: [CardsService],
        }).compile();

        prismaService = module.get<PrismaService>(PrismaService);
        cardsService = module.get<CardsService>(CardsService);
    })
    beforeEach(async () => {
        await prismaService.card.deleteMany();
      });

      afterEach(async () => {
        await prismaService.card.deleteMany();
      });
    describe('create', () => {
        it('should create a new card', async () => {
            delete mockCreateCardDto.id;
            const result = await cardsService.create(mockCreateCardDto);

            expect(result).toHaveProperty('id');
            expect(result.name).toEqual(mockCreateCardDto.name)
            expect(result.number).toEqual(mockCreateCardDto.number)
            expect(result.cvv).toEqual(mockCreateCardDto.cvv)
        });

        it('should throw a ConflictException when creating a card with an existing number', async () => {
            delete mockCreateCardDto.id;
            await prismaService.card.create({
                data: mockCreateCardDto,
            })
            await expect(cardsService.create(mockCreateCardDto)).rejects.toThrowError(
                new ConflictException("A credit card with the same number already exists.")
            )
        });
      });
      describe('findAll', () => {
        it('should return an array of cards', async () => {
          delete mockCreateCardDto.id;
          await prismaService.card.create({
            data: mockCreateCardDto,
          })
          const result = await cardsService.findAll();
          expect(result.length).toEqual(1);
          expect(result[0].name).toEqual(mockCreateCardDto.name)
          expect(result[0].number).toEqual(mockCreateCardDto.number)
          expect(result[0].cvv).toEqual(mockCreateCardDto.cvv)
        });
        it('should return an empty array of cards', async () => {
            const result = await cardsService.findAll();
            expect(result.length).toEqual(0);
        });
      });

      describe('findOne', () => {
        it('should return a card by id', async () => {
          delete mockCreateCardDto.id;
          const card = await prismaService.card.create({
            data: mockCreateCardDto,
          })
          const result = await cardsService.findOne(card.id);
          expect(result.name).toEqual(card.name)
          expect(result.number).toEqual(card.number)
          expect(result.cvv).toEqual(card.cvv)
        });

        it('should return NotFoundException when the card with the given id is not found', async () => {
          await expect(cardsService.findOne(uuid())).rejects.toThrowError(NotFoundException)
        });
      });
      describe('findOneByNumber', () => {
        it('should return a card by number', async () => {
          delete mockCreateCardDto.id;
          const card = await prismaService.card.create({
            data: mockCreateCardDto,
          })
          const result = await cardsService.findOneByNumber(card.number);
          expect(result.name).toEqual(card.name)
          expect(result.number).toEqual(card.number)
          expect(result.cvv).toEqual(card.cvv)
        });

        it('should return null when the card with the given number is not found', async () => {
          const result = await cardsService.findOneByNumber(uuid());
          expect(result).toBeNull();
        });
      });

      describe('update', () => {
        it('should update a card', async () => {
          delete mockCreateCardDto.id;
          const card = await prismaService.card.create({
            data: mockCreateCardDto,
          })
          const upadatedCard = { ...card, name: "Jane Doe"}
          const result = await cardsService.update(card.id, upadatedCard);

          expect(result).toEqual(upadatedCard);
        });
        it('should return NotFoundException when the card with the given id is not found', async () => {
          const updatedCard = { ...mockCreateCardDto, id: uuid(), name: "Jane Doe"}
          await expect(cardsService.update(updatedCard.id, updatedCard)).rejects.toThrowError(NotFoundException)
        });
      });
      describe('remove', () => {
        it('should remove a card', async () => {
          delete mockCreateCardDto.id;
          const card = await prismaService.card.create({
            data: mockCreateCardDto,
          })

          const result =await cardsService.remove(card.id);

          expect(result).toEqual(card)
        });


          it('should return NotFoundException when the card with the given id is not found', async () => {
            await expect(cardsService.remove(uuid())).rejects.toThrowError(NotFoundException)
          });

      });

})
