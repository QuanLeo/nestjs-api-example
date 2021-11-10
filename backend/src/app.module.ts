import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // type of our database
      host: process.env.MYSQL_HOST, // database host
      port: +process.env.MYSQL_PORT, // database host
      username: process.env.MYSQL_USER, // username
      password: process.env.MYSQL_PASSWORD, // user password
      database: process.env.MYSQL_DATABASE, // name of our database,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
