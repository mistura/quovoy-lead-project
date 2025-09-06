import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from '@prisma/client';

export class CreateLeadDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
