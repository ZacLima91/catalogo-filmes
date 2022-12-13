import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movie.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [AuthModule, UsersModule, MoviesModule],
})
export class AppModule {}
