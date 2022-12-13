import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthRequest {
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  id: string;
  
  name: string;
}
