import { Favorite } from "@prisma/client";
import { CreateUserDto } from "../dto/create-user.dto";

export class User  {
    id: string;
    name: string;
    email: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
    favorites?: Favorite[];
  }