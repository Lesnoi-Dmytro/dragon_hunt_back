import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  public getUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('email') email: string,
    @Query('name') name: string,
  ) {
    return this.userService.getAllUsers(page, limit, email, name);
  }

  @Get('/email/:email')
  public getUserByEmail(@Param('email') email: string) {
    return this.userService.getUsersByEmail(email);
  }

  @Get('/name/:name')
  public getUserByName(@Param('name') name: string) {
    return this.userService.getUsersByName(name);
  }
}