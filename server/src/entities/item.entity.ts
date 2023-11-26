import { BeforeUpdate, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { IItem } from "../types";

@Entity({ tableName: 'items' })
export class ItemEntity {
  constructor(data: IItem) {
    if (data) {
      Object.keys(data).forEach((key) => {
          this[key] = data[key];
      });
      const date = new Date();
      this.createdAt = date;
      this.updatedAt = date;
    }
  }

  @PrimaryKey() id: number;
  @Property() name: string;
  @Property() price: number;
  @Property() quantity: number;
  @Property() image: string;

  @Property({ columnType: 'timestamptz' }) createdAt!: Date;
  @Property({ columnType: 'timestamptz' }) updatedAt!: Date;
  @Property({ columnType: 'timestamptz', nullable: true }) deletedAt?: Date;
  @BeforeUpdate() updateData(): void { this.updatedAt = new Date(); }
}