import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favovite.service';

@Module({
  imports: [PrismaModule,PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoritesModule {}