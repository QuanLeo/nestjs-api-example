import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
