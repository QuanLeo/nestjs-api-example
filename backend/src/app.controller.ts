import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { BasicAuthDto } from './auth/dto/basic_auth.dto';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';

@ApiTags('public')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  login(@Body() basicAuthDto: BasicAuthDto): any {
    return this.authService.login(basicAuthDto);
  }

  @Post('create_user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
