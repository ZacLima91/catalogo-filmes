import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';


@Module({
  imports: [PrismaModule,PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers:[ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}