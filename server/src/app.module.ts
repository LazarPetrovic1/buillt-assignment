import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ItemsController } from './items/items.controller';
import { ItemsModule } from './items/items.module';
import mikroOrmConfig from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...mikroOrmConfig
    }),
    UsersModule,
    ItemsModule
  ],
  controllers: [UsersController, ItemsController],
  providers: [],
})
export class AppModule {}
