import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do filme',
    example: 'O senhor das armas',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descrição do filme',
    example: 'Filme muito bom',
  })
  description: string;

  @IsUrl()
  @ApiProperty({
    description: 'Link da imagem do filme',
    example: 'https://i.imgur.com/sgsdgsd.png',
  })
  imgUrl: string;

  @IsNumber()
  @ApiProperty({
    description: 'Ano do filme',
    example: '1999',
  })
  year: number;
}
