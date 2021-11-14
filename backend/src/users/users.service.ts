import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassowrd } from 'src/common/encryption';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const params = this.preCreate(createUserDto);
    const user = this.userRepository.create(params);

    return await this.userRepository.save(user).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException(`user ${id} not found`);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: +id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`user ${id} not found`);
    }

    return await this.userRepository.save(user).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException(`user ${id} not found`);

    return this.userRepository.remove(user).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  preCreate(params: any = {}) {
    return {
      ...params,
      password: encryptPassowrd(params.password),
    };
  }

  async changePassword(user: any, changePasswordDto: ChangePasswordDto) {
    const encryptPass = encryptPassowrd(changePasswordDto.password);
    user.password = encryptPass;

    return await this.userRepository.save(user).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
