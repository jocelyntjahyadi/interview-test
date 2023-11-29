import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity/user.entity';
import { IsUniqueConstraint } from './user/shared/validation/is-unique-constraint';

@Module({
  imports: [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port : 5432,
    password: 'password',
    username: 'postgres',
    entities : [User],
    database : 'test',
    synchronize : true,
    logging : true,
  }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}
