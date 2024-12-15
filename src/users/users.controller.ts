import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/auth.guard';
import { GoogleService } from 'src/google.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly googleService: GoogleService,
  ) {}

  @Get('/')
  public getUsers(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('email') email: string,
    @Query('name') name: string,
  ) {
    return this.userService.getAllUsers(page, limit, email, name);
  }

  @Public()
  @Get('/email/:email')
  public getUserByEmail(@Param('email') email: string) {
    return this.userService.getUsersByEmail(email);
  }

  @Public()
  @Get('/name/:name')
  public getUserByName(@Param('name') name: string) {
    return this.userService.getUsersByName(name);
  }
}
