import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { PrismaService } from 'src/adapters/prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

const mockCreateCardDto: CreateCardDto = {
  id: uuid(),
  number: '0000 0000 0000 0000',
  cvv: '123',
  name: 'John Doe',
  validDate: '12/24'
};


describe('CardsService', () => {
  let service: CardsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: PrismaService,
          useValue: {
            card: {
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a new card', async () => {

      const mockCard = { ...mockCreateCardDto };
      (prismaService.card.findUnique as jest.Mock).mockResolvedValue(null);
      (prismaService.card.create as jest.Mock).mockResolvedValue(mockCard);


      const result = await service.create(mockCreateCardDto);


      expect(result).toEqual(mockCard);
      expect(prismaService.card.findUnique).toHaveBeenCalledWith({ where: { number: mockCard.number } });
      expect(prismaService.card.create).toHaveBeenCalledWith({ data: mockCreateCardDto });
    });

    it('should throw a ConflictException when creating a card with an existing number', async () => {

      (prismaService.card.findUnique as jest.Mock).mockResolvedValue(mockCreateCardDto);


      await expect(service.create(mockCreateCardDto)).rejects.toThrowError(ConflictException);
      expect(prismaService.card.findUnique).toHaveBeenCalledWith({ where: { number: mockCreateCardDto.number } });
    });
  });

  describe('findAll', () => {
    it('should return an array of cards', async () => {

      const mockCards = [mockCreateCardDto, mockCreateCardDto]; // Sample mock cards
      (prismaService.card.findMany as jest.Mock).mockResolvedValue(mockCards);


      const result = await service.findAll();


      expect(result).toEqual(mockCards);
      expect(prismaService.card.findMany).toHaveBeenCalledTimes(1);
    });
    it('should return an empty array of cards', async () => {

      const mockCards = []; 
      (prismaService.card.findMany as jest.Mock).mockResolvedValue(mockCards);


      const result = await service.findAll();


      expect(result).toEqual(mockCards);
      expect(prismaService.card.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a card by id', async () => {
      const mockCard = { ...mockCreateCardDto, id: uuid() };
      (prismaService.card.findUnique as jest.Mock).mockResolvedValue(mockCard);

      const result = await service.findOne(mockCard.id);

      expect(prismaService.card.findUnique).toHaveBeenCalledWith({ where: { id: mockCard.id} });
      expect(result).toEqual({ ...mockCard });
    });

    it('should return NotFoundException when the card with the given id is not found', async () => {
      (prismaService.card.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(mockCreateCardDto.id)).rejects.toThrowError(
        new NotFoundException(`Card with ID '${mockCreateCardDto.id}' not found.`)
      );

      expect(prismaService.card.findUnique).toHaveBeenCalledWith({ where: { id: mockCreateCardDto.id } });
    });
  });

  describe('findOneByNumber', () => {
    it('should return a card by number', async () => {
      const mockCard = { ...mockCreateCardDto, id: uuid() };
      (prismaService.card.findUnique as jest.Mock).mockResolvedValue(mockCard);

      const result = await service.findOneByNumber(mockCard.number);

      expect(prismaService.card.findUnique).toHaveBeenCalledWith({ where: { number: mockCard.number } });
      expect(result).toEqual({ ...mockCard, number: mockCard.number });
    });

    it('should return null when the card with the given number is not found', async () => {
      (prismaService.card.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await service.findOneByNumber(mockCreateCardDto.number);

      expect(result).toBeNull();

      expect(prismaService.card.findUnique).toHaveBeenCalledWith({ where: { number: mockCreateCardDto.number } });
    });
  });

  describe('update', () => {
    it('should update a card', async () => {
      const mockCard = { ...mockCreateCardDto, id: uuid() };
      const mockUpdateCardDto = { ...mockCreateCardDto, name: 'Jane Doe' };
      (prismaService.card.findUnique as jest.Mock).mockResolvedValue(mockCard);
      (prismaService.card.update as jest.Mock).mockResolvedValue(mockUpdateCardDto);

      const result = await service.update(mockCard.id, mockUpdateCardDto);

      expect(prismaService.card.findUnique).toHaveBeenCalledWith({ where: { id: mockCard.id } });
      expect(prismaService.card.update).toHaveBeenCalledWith({ where: { id: mockCard.id }, data: mockUpdateCardDto });
      expect(result).toEqual({ ...mockUpdateCardDto });
    });

    it('should throw a NotFoundException when updating a non-existing card', async () => {
      (prismaService.card.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.update(mockCreateCardDto.id, mockCreateCardDto)).rejects.toThrowError(NotFoundException);
      expect(prismaService.card.findUnique).toHaveBeenCalledWith({ where: { id: mockCreateCardDto.id } });
    });
  });

  describe('remove', () => {
    it('should remove a card', async () => {
      const mockCard = { ...mockCreateCardDto, id: uuid() };
      (prismaService.card.findUnique as jest.Mock).mockResolvedValue(mockCard);
      (prismaService.card.delete as jest.Mock).mockResolvedValue(mockCard);

      await service.remove(mockCard.id);

      expect(prismaService.card.findUnique).toHaveBeenCalledWith({ where: { id: mockCard.id } });
      expect(prismaService.card.delete).toHaveBeenCalledWith({ where: { id: mockCard.id } });
    });

    it('should throw a NotFoundException when removing a non-existing card', async () => {
      (prismaService.card.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.remove(mockCreateCardDto.id)).rejects.toThrowError(NotFoundException);
      expect(prismaService.card.findUnique).toHaveBeenCalledWith({ where: { id: mockCreateCardDto.id } });
    });
  });
});
