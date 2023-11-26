import { Body, Controller, Get, HttpCode, Post, Headers, Logger, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { GenericMessage, IUserLogin, LoginReturn, Transaction } from 'src/types';
import { UserEntity } from 'src/entities';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ) {}

  private readonly logger = new Logger("UsersController");

  @Post("login")
  @HttpCode(201)
  async login(@Body() data: IUserLogin) : Promise<LoginReturn | { msg: string }> {
    return await this.userService.login(data)
  }

  @Get()
  @HttpCode(200)
  getItem(@Headers() headers) {
    this.logger.log(headers);
    return headers;
  }

  @Get("me")
  @HttpCode(200)
  async getMe(@Headers() headers) : Promise<UserEntity | null> {
    return await this.userService.getMe(headers)
  }

  @Post("pay")
  @HttpCode(200)
  async executePayment(@Body() transaction: Transaction) : Promise<number | GenericMessage> {
    return await this.userService.pay(transaction);
  }
}
