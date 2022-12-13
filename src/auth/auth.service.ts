import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from 'src/user/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
import { UserPayload } from './models/UserPayload';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthRequest } from './models/AuthRequest';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersServices: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.usersServices.getByEmail(userEmail);

    const passwordIsValid = await compare(userPassword, user.password);
    if (!passwordIsValid) {
      throw new Error('Email address or password provided is incorrect.');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({
        email: user.email,
        id: user.id,
        name: user.name,
      }),
      user,
    };
  }
}
