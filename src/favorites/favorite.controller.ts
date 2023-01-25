import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FavoriteMovieDto } from './dto/favorite.dto';
import { Favorite } from './entity/favorites.entity';
import { FavoriteService } from './favovite.service';

@ApiTags('favorites')
@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoritesService: FavoriteService) {}

  @Get(':id/favorites')
  @ApiOperation({
    summary: 'Lista de produtos favoritos de um usuário',
  })
  findFavoriteMovies(@Param('id') id: string): Promise<Favorite[]> {
    return this.favoritesService.findFavoriteMovies(id);
  }
  
  @Post('favorite')
  @ApiOperation({
    summary: 'Favoritar filme',
  })
  favorite(@Body() dto: FavoriteMovieDto): Promise<Favorite> {
    return this.favoritesService.favorite(dto);
  }
}
