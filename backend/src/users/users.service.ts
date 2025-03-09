import {
  Injectable,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
    @Inject('CONSENT_SERVICE')
    private readonly client: ClientProxy,
  ) {
    // Initialize connection to RabbitMQ
    this.client.connect().catch((err) => {
      console.error('Failed to connect to RabbitMQ:', err);
    });
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Check if email already exists
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new UnprocessableEntityException('Email already exists');
      }

      const user = this.userRepository.create({
        ...createUserDto,
        consents: ['read', 'write'],
      });

      const savedUser = await queryRunner.manager.save(user);

      console.log('Attempting to emit event to RabbitMQ...');

      await lastValueFrom(this.client.emit('user_created', savedUser)).catch(
        (emitError) => {
          console.error('RabbitMQ emission error:', emitError);
          throw emitError;
        },
      );

      console.log('Successfully emitted event to RabbitMQ');
      await queryRunner.commitTransaction();

      return new UserResponseDto({
        id: savedUser.id,
        email: savedUser.email,
        consents: savedUser.consents,
      });
    } catch (error: unknown) {
      await queryRunner.rollbackTransaction();
      if (error instanceof UnprocessableEntityException) {
        throw error;
      }
      if (error instanceof Error) {
        throw new UnprocessableEntityException(error.message);
      }
      throw new UnprocessableEntityException(
        'Failed to create user due to an unknown error',
      );
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
