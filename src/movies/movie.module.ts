import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MovieController } from './movie.controller';
import { MoviesService } from './movie.service';

@Module({
  imports: [PrismaModule,PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers: [MovieController],
  providers: [MoviesService],
})
export class MoviesModule {}