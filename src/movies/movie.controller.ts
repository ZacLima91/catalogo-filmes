import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MoviesService } from './movie.service';
import { Movie } from './entity/movie.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({
    summary: 'Criação de filmes',
  })
  create(@Body() dto: CreateMovieDto) {
    return this.moviesService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listagem de filmes',
  })
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Listagem de um filme',
  })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  /*@Get(':id/users-liked')
    @ApiOperation({
      summary: 'Lista de usuários que tem o produto do id enviado como favorito',
    })
    findUsersLiked(@Param('id') id: string) {
      return this.productsService.findUsersLiked(id);
    }*/

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualização de um filme',
  })
  update(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    return this.moviesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Exclusão de um filme',
  })
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }

  /*@Post('favorite')
    @ApiOperation({
      summary: 'Favoritar produto',
    })
    favorite(@Body() dto: FavoriteProductDto): Promise<Favorite> {
      return this.productsService.favorite(dto);
    }
  
    @Delete('favorite/:id')
    @ApiOperation({
      summary: 'Desfavoritar produto',
    })
    disfavoring(@Param('id') id: string) {
      return this.productsService.disfavoring(id);
    }*/
}
