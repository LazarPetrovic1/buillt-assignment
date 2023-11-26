import { Controller, Get, HttpCode, Logger } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemEntity } from 'src/entities';
import { ErrMsg } from 'src/types';

@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService : ItemsService
  ) {}

  private readonly logger = new Logger("ItemsController");

  @Get("")
  @HttpCode(200)
  async getAllItems() : Promise<ItemEntity[] | ErrMsg> {
    return await this.itemsService.getItems();
  }
}
