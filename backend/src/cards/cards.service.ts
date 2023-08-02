import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/adapters/prisma/prisma.service';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return this.prisma.card.findMany();
  }

  async create(createCardDto: CreateCardDto) {
    const hasCreditCard = await this.findOneByNumber(createCardDto.number);
    if (hasCreditCard) {
      throw new ConflictException(
        'A credit card with the same number already exists.',
      );
    }

    return this.prisma.card.create({
      data: createCardDto,
    });
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    await this.findOne(id);

    return this.prisma.card.update({
      where: { id },
      data: updateCardDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.card.delete({
      where: { id },
    });
  }

  async findOne(id: string) {
    const card = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException(`Card with ID '${id}' not found.`);
    }

    return card;
  }

  async findOneByNumber(number: string) {
    return this.prisma.card.findUnique({
      where: {
        number,
      },
    });
  }
}
