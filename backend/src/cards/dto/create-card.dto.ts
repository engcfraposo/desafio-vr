import { ApiProperty } from '@nestjs/swagger';
import { IsCreditCard, IsInt, IsUUID, Length } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: 'The unique identifier of the card',
    example: '4ec42ba9-50af-40d2-af90-8312edbd9ca2',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The credit card number',
    example: '3529 5435 3355 8727',
  })
  @IsCreditCard()
  @Length(19, 19)
  number: string;

  @ApiProperty({
    description: 'The card verification value',
    example: '317',
    minLength: 3,
    maxLength: 3,
  })
  @IsInt()
  @Length(3, 3, { message: 'CVV must be exactly 3 digits long' })
  cvv: string;

  @ApiProperty({
    description: 'The name of the cardholder',
    example: 'John Doe',
    maxLength: 255,
  })
  @Length(1, 255)
  name: string;
}
