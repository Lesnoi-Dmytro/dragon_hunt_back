import { Body, Controller, Post } from '@nestjs/common';
import Credentials from './types/credentials.type';
import { AuthService } from './auth.service';
import RegisterRequest from './types/register.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  public async signin(@Body() credentials: Credentials) {
    return this.authService.signin(credentials.username, credentials.password);
  }

  @Post('/register')
  public async register(@Body() registerRequest: RegisterRequest) {
    return this.authService.register(
      registerRequest.email,
      registerRequest.name,
      registerRequest.password,
    );
  }

  @Post('/google')
  public async authWithGoogle(@Body('access_token') access_token: string) {
    return this.authService.authWithGoogle(access_token);
  }
}
