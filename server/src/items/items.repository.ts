import { EntityRepository } from "@mikro-orm/postgresql";
import { ItemEntity } from "src/entities/item.entity";
export class ItemRepository extends EntityRepository<ItemEntity> {}