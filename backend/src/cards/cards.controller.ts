import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@Controller('cards')
@ApiTags('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Card successfully created.' })
  @ApiBadRequestResponse({ description: 'Invalid data. Card not created.' })
  @ApiConflictResponse({
    description: 'A credit card with the same number already exists.',
  })
  async create(@Body() createCardDto: CreateCardDto) {
    const res = await this.cardsService.create(createCardDto);
    res.number = this.formatCardNumber(res.number);
    return res;
  }

  @Get()
  @ApiOkResponse({
    description: 'Successfully retrieved all cards.',
    type: [CreateCardDto],
  })
  async findAll() {
    const res = await this.cardsService.findAll();
    return res.map((card) => {
      return { ...card, number: this.formatCardNumber(card.number) };
    });
  }

  @Get('/id/:id')
  @ApiOkResponse({
    description: 'Successfully retrieved a card by ID.',
    type: CreateCardDto,
  })
  @ApiNotFoundResponse({ description: 'Card not found.' })
  async findOne(@Param('id') id: string) {
    const res = await this.cardsService.findOne(id);
    res.number = this.formatCardNumber(res.number);
    return res;
  }

  @Get('/number/:number')
  @ApiOkResponse({
    description: 'Successfully retrieved a card by number.',
    type: CreateCardDto,
  })
  @ApiNotFoundResponse({ description: 'Card not found.' })
  async findOneByNumber(@Param('number') number: string) {
    const res = await this.cardsService.findOneByNumber(number);
    res.number = this.formatCardNumber(res.number);
    return res;
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Card successfully updated.' })
  @ApiNotFoundResponse({ description: 'Card not found.' })
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    const res = await this.cardsService.update(id, updateCardDto);
    res.number = this.formatCardNumber(res.number);
    return res;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Card successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Card not found.' })
  async remove(@Param('id') id: string) {
    await this.cardsService.remove(id);
  }

  private formatCardNumber(number: string): string {
    return number.replace(/(\d{4})(?=\d)/g, '$1 ');
  }
}
