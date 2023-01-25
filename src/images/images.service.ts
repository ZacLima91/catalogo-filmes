import { PrismaService } from "src/prisma/prisma.service";
import {Images} from './entity/image.entity'
import { Prisma } from '@prisma/client';
import { Injectable } from "@nestjs/common";

@Injectable()
export class ImagesService {
    constructor(private readonly prisma: PrismaService){}

    async findAll():Promise<Images[] | void>{
        return this.prisma.images.findMany()
    }
}