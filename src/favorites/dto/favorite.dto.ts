import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FavoriteMovieDto {
  @ApiProperty({
    description: 'Id do usuário que está favoritando o filme',
    example: 'acb989bb-c9ee-4d13-bf8a-6dab15cce935',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id do filme a ser favoritado',
    example: 'acb989bb-c9ee-4d13-bf8a-6dab15cce935',
  })
  movieId: string;
}