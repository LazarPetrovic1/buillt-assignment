import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ItemEntity, UserEntity } from 'src/entities';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ItemsModule } from 'src/items/items.module';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [UserEntity, ItemEntity] }), ItemsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
