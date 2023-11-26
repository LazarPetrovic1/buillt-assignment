import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Logger } from '@nestjs/common';
import { ItemEntity } from '../src/entities';
import { seedItems } from '.';

export class ItemsSeeder extends Seeder {
  private readonly logger = new Logger("ItemsSeeder");
  async run(em: EntityManager): Promise<void> {
    const items = await em.find(ItemEntity, {});
    if (items.length < 1) {
      const newItems = [];
      for (const item of seedItems) newItems.push(new ItemEntity(item));
      await em.insertMany(newItems);
      this.logger.log("Items seeded successfully.");
    } else this.logger.warn("The items table has already been seeded.")
  }
}
