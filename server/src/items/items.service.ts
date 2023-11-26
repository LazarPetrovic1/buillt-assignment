import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { ItemEntity } from 'src/entities';
import { ItemRepository } from './items.repository';
import { ErrMsg } from 'src/types';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemsRepository : ItemRepository
  ) {}

  private readonly logger = new Logger("ItemsService");

  async getItems() : Promise<ItemEntity[] | ErrMsg> {
    try {
      return await this.itemsRepository.findAll();
    } catch (e) {
      return { msg: "Something went wrong", stack: e }
    }
  }
}
