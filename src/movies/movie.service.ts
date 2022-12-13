import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleConstrainUniqueError } from 'src/utils/handle-error-unique.util';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { Prisma } from '@prisma/client';
import { FavoriteMovieDto } from 'src/favorites/dto/favorite.dto';
import { Favorite } from 'src/favorites/entity/favorites.entity';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMovieDto): Promise<Movie | void> {
    return this.prisma.movie
      .create({ data: dto })
      .catch(handleConstrainUniqueError);
  }

  findAll(): Promise<Movie[]> {
    return this.prisma.movie.findMany();
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

  findOne(id: string): Promise<Movie> {
    return this.verifyIdAndReturnUser(id);
  }

  async update(id: string, dto: UpdateMovieDto): Promise<Movie | void> {
    await this.verifyIdAndReturnUser(id);
    return this.prisma.movie
      .update({ where: { id }, data: dto })
      .catch(handleConstrainUniqueError);
  }

  async remove(id: string): Promise<Movie> {
    await this.verifyIdAndReturnUser(id);
    return this.prisma.movie.delete({ where: { id } });
  }
  
  async favorite(dto: FavoriteMovieDto): Promise<Favorite> {
    const user: User = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });
    if (!user) {
      throw new NotFoundException(`Entrada de id ${dto.userId} não encontrada`);
    }

    const movie: Movie = await this.prisma.movie.findUnique({
      where: { name: dto.movieName },
    });

    if (!movie) {
      throw new NotFoundException(
        `Filme de nome '${dto.movieName}' não encontrado`,
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
          name: dto.movieName,
        },
      },
    };

    return this.prisma.favorite.create({ data });
  }

  async disfavoring(id: string) {
    await this.verifyIdAndReturnUser(id);
    return this.prisma.favorite.delete({ where: { id } });
  }

  async findUsersLiked(id: string) {
    const movie: Movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    return this.prisma.favorite.findMany({
      where: {
        movieName: movie.name,
      },
      select: {
        movieName: true,
        user: { select: { id: true, name: true } },
      },
    });
  }
 
}