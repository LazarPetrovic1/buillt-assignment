import { BeforeUpdate, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { IUser } from "../types";
import { UserRepository } from "../users/users.repository";

@Entity({ tableName: 'users', customRepository: () =>  UserRepository })
export class UserEntity {
  constructor(data: IUser) {
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
  @Property() name!: string;
  @Property({ unique: true }) email!: string;
  @Property({ unique: true }) username!: string;
  @Property() password!: string;
  @Property() balance!: number;

  @Property({ columnType: 'timestamptz' }) createdAt!: Date;
  @Property({ columnType: 'timestamptz' }) updatedAt!: Date;
  @Property({ columnType: 'timestamptz', nullable: true }) deletedAt?: Date;
  @BeforeUpdate() updateData(): void { this.updatedAt = new Date(); }
}