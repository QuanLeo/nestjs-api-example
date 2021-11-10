import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { BasicAuthDto } from './dto/basic_auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(UsersService)
    private readonly userService: UsersService,
  ) {}

  async validateUser(basicAuthDto: BasicAuthDto) {
    const user = await this.userService.findByEmail(basicAuthDto.email);

    if (user && basicAuthDto.password === user.password) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }

  async login(basicAuthDto: BasicAuthDto) {
    const user = await this.validateUser(basicAuthDto);

    const payload = { uid: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
