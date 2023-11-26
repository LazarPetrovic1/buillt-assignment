import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ItemEntity } from 'src/entities';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [ItemEntity] })],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService]
})
export class ItemsModule {}
