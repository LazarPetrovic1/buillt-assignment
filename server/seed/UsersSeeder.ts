import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserEntity } from '../src/entities';
import { seedUser } from '.';
import * as bcrypt from 'bcryptjs'
import { Logger } from '@nestjs/common';

export class UsersSeeder extends Seeder {
  private readonly logger = new Logger("UsersSeeder");

  async run(em: EntityManager): Promise<void> {
    const user = await em.find(UserEntity, {}); // checking whether a user exists
    if (user.length < 1) {
      const salt: string = await bcrypt.genSalt(3);
      const newPassword = await bcrypt.hash(seedUser.password, salt);
      const newUser = new UserEntity({ ...seedUser, password: newPassword });
      await em.persistAndFlush(newUser);
      this.logger.log("User created successfully.");
    } else this.logger.warn("The user table has already been seeded.");
  }
}
