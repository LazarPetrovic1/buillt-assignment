import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { ItemEntity, UserEntity } from 'src/entities';
import { UserRepository } from './users.repository';
import { GenericMessage, IUserLogin, LoginReturn, Transaction } from 'src/types';
import { secret } from 'src/constants';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import { ItemRepository } from 'src/items/items.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    @InjectRepository(ItemEntity)
    private readonly itemRepository: ItemRepository
  ) {}
  private readonly logger = new Logger("UsersService");

  async getDecodedUserResults(token: string) : Promise<UserEntity | false> {
    const decodedUser = jwt.verify(token, secret)
    // @ts-ignore
    const user = await this.userRepository.findOne({ id: decodedUser.user.id })
    if (!user) return false
    return user
  }

  async decodeHeaders(tokenItem: string, headers) : Promise<UserEntity | false> {
    if (tokenItem) {
      return await this.getDecodedUserResults(tokenItem);
    }
    if (headers.authorization && headers.authorization.indexOf(" ") >= 0) {
      const token = await headers.authorization.split(" ")[1];
      if (!token || token === "null") return false;
      try {
        return await this.getDecodedUserResults(token);
      } catch (e) {
        this.logger.log("ERROR", e);
        return false
      }
    }
    return false
  }

  async login(data: IUserLogin) : Promise<LoginReturn | { msg: string }> {
    const { email, password } = data
    try {
      const user = await this.userRepository.findOne({ email })
      if (!user) return { msg: "Invalid credentials" } // error goes here
      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) return { msg: "Invalid credentials" } // error goes here
      const token = jwt.sign({ user: { id: user.id } }, secret, {
        expiresIn: 1 * 1000 * 60 * 60 * 24 * 365 * 10 // 10 years
      })
      const { id, name, username, balance, createdAt, updatedAt, deletedAt } = user;
      return {
        token,
        user: {
          id,
          name,
          email: user.email,
          username,
          balance,
          createdAt,
          updatedAt,
          deletedAt
        }
      }
    } catch (e) { this.logger.log(e); }
  }

  async getMe(headers) : Promise<UserEntity | null> {
    try {
      const user = await this.decodeHeaders("", headers);
      if (user) return user;
      return null
    } catch (e) {
      this.logger.log(e);
    }
  }

  async pay(transaction: Transaction) : Promise<number | GenericMessage> {
    const { id, cost, items } = transaction;
    try {
      const user = await this.userRepository.findOne({ id });
      if (cost > user.balance) {
        return { msg: "User's balance is too low to execute a transaction." };
      }
      for (const item of items) {
        const foundItem = await this.itemRepository.findOne({ id: item.id });
        await this.itemRepository.nativeUpdate(foundItem.id, {
          ...foundItem,
          quantity: foundItem.quantity - item.amountOrdered
        });
      }
      const newUser = { ...user, balance: user.balance - cost };
      await this.userRepository.nativeUpdate(user.id, newUser);
      return newUser.balance;
    } catch (e) {
      this.logger.log(e);
    }
  }
}
