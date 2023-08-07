import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

const mockCreateCardDto: CreateCardDto = {
  id: uuid(),
  number: '0000 0000 0000 0000',
  cvv: '123',
  name: 'John Doe',
  validDate: '12/24'
};

describe('CardsController', () => {
  let controller: CardsController;
  let service: CardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        {
          provide: CardsService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            findOneByNumber: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CardsController>(CardsController);
    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new card', async () => {
      const mockCard = { ...mockCreateCardDto, id: 'mock-id-1' };
      (service.create as jest.Mock).mockResolvedValue(mockCard);

      const result = await controller.create(mockCreateCardDto);

      expect(service.create).toHaveBeenCalledWith(mockCreateCardDto);
      expect(result).toEqual({ ...mockCard });
    });

    it('should throw a ConflictException when creating a card with an existing number', async () => {
      (service.create as jest.Mock).mockRejectedValue(new ConflictException('A credit card with the same number already exists.'));

      await expect(controller.create(mockCreateCardDto)).rejects.toThrowError(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an array of cards', async () => {
      const mockCards = [{ ...mockCreateCardDto, id: uuid() }, { ...mockCreateCardDto, id: uuid() }];
      (service.findAll as jest.Mock).mockResolvedValue(mockCards);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([
        { ...mockCards[0] },
        { ...mockCards[1] },
      ]);
    });
  });

  describe('findAll', () => {
    it('should return an empty array of cards', async () => {
      (service.findAll as jest.Mock).mockResolvedValue([]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a card by ID', async () => {
      const mockCard = { ...mockCreateCardDto, id: uuid() };
      (service.findOne as jest.Mock).mockResolvedValue(mockCard);

      const result = await controller.findOne(mockCard.id);

      expect(service.findOne).toHaveBeenCalledWith(mockCard.id);
      expect(result).toEqual({ ...mockCard });
    });

    it('should throw a NotFoundException when the card with the given ID is not found', async () => {
      (service.findOne as jest.Mock).mockRejectedValue(new NotFoundException('Card not found.'));

      await expect(controller.findOne(uuid())).rejects.toThrowError(NotFoundException);
    });
  });
  describe('findOneByNumber', () => {
    it('should return a card by number', async () => {
      const mockCard = { ...mockCreateCardDto, id: uuid() };
      (service.findOneByNumber as jest.Mock).mockResolvedValue(mockCard);

      const result = await controller.findOneByNumber(mockCard.number);

      expect(service.findOneByNumber).toHaveBeenCalledWith(mockCard.number);
      expect(result).toEqual({ ...mockCard });
    });

    it('should throw a NotFoundException when the card with the given number is not found', async () => {
      (service.findOneByNumber as jest.Mock).mockResolvedValueOnce(null);

      await expect(controller.findOneByNumber(uuid())).rejects.toThrowError(NotFoundException);
    });
  });
  describe('update', () => {
    it('should update a card', async () => {
      const mockCard = { ...mockCreateCardDto, id: uuid() };
      const mockUpdateCardDto = { ...mockCreateCardDto, id: mockCard.id, name: 'Jane Doe' };
      (service.update as jest.Mock).mockResolvedValue(mockUpdateCardDto);

      const result = await controller.update(mockCard.id, mockUpdateCardDto);

      expect(service.update).toHaveBeenCalledWith(mockCard.id, mockUpdateCardDto);
      expect(result).toEqual({ ...mockCard, name: 'Jane Doe' });
    });

    it('should throw a NotFoundException when updating a non-existing card', async () => {
      (service.update as jest.Mock).mockRejectedValue(new NotFoundException('Card not found.'));

      await expect(controller.update(uuid(), mockCreateCardDto)).rejects.toThrowError(NotFoundException);
    });
  });
  describe('remove', () => {
    it('should remove a card', async () => {
      (service.remove as jest.Mock).mockResolvedValue(undefined);

      await controller.remove(mockCreateCardDto.id);

      expect(service.remove).toHaveBeenCalledWith(mockCreateCardDto.id);
    });

    it('should throw a NotFoundException when removing a non-existing card', async () => {
      (service.remove as jest.Mock).mockRejectedValue(new NotFoundException('Card not found.'));

      await expect(controller.remove(uuid())).rejects.toThrowError(NotFoundException);
    });
  });
});
