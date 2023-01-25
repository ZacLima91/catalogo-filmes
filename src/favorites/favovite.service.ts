import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import console from 'console';
import { Movie } from 'src/movies/entity/movie.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entity/user.entity';
import { FavoriteMovieDto } from './dto/favorite.dto';
import { Favorite } from './entity/favorites.entity';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  async favorite(dto: FavoriteMovieDto): Promise<Favorite> {
    const user: User = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });
    if (!user) {
      throw new NotFoundException(`Entrada de id ${dto.userId} não encontrada`);
    }

    const movie: Movie = await this.prisma.movie.findUnique({
      where: { id: dto.movieId },
    });

    if (!movie) {
      throw new NotFoundException(
        `Filme de nome '${dto.movieId}' não encontrado`,
      );
    }

    const data: Prisma.FavoriteCreateInput = {
      user: {
        connect: {
          id: dto.userId,
        },
      },
      movie: {
        connect: {
          id: dto.movieId,
        },
      },
    };

    return this.prisma.favorite.create({ data });
  }

  async verifyIdAndReturnUser(id: string): Promise<Movie> {
    const movie: Movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException(`Entrada de id ${id} não encontrada`);
    }

    return movie;
  }

  async findFavoriteMovies(id: string): Promise<Favorite[]> {
    await this.verifyIdAndReturnUser(id);



    const moviesFavoritesUser = this.prisma.favorite.findMany({
      select: { movieId: true, movie: true },
    });

    return moviesFavoritesUser;
  }
}
