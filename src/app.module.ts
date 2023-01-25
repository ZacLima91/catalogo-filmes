import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movie.module';
import { UsersModule } from './user/users.module';
import { ImagesModule } from './images/images.module';
import { FavoritesModule } from './favorites/favorite.module';

@Module({
  imports: [AuthModule, UsersModule, MoviesModule, FavoritesModule],
})
export class AppModule {}
