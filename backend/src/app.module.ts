import { Module } from '@nestjs/common';
import { CardsModule } from './cards/cards.module';
import { PrismaModule } from './adapters/prisma/prisma.module';

@Module({
  imports: [CardsModule, PrismaModule],
})
export class AppModule {}
