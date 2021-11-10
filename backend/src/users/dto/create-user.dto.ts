import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsNumber()
  readonly role: number;

  @IsOptional()
  @IsString()
  readonly address: string;

  @IsOptional()
  @IsString()
  readonly avatar: string;

  @IsOptional()
  @IsString()
  readonly dob: string;

  @IsOptional()
  @IsString()
  readonly sex: string;

  @IsOptional()
  @IsString()
  readonly phone_number: string;

  @IsOptional()
  @IsArray()
  readonly departments: any[];

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
