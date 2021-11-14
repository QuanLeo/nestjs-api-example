import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'admin@example.com' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly address: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly avatar: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly dob: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly sex: string;

  @IsOptional()
  @IsString()
  readonly phone_number: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  readonly departments: any[];

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly labor_contract: number;

  @IsOptional()
  @IsNumber()
  readonly day_off: number;

  @IsOptional()
  @IsNumber()
  readonly active: number;
}
