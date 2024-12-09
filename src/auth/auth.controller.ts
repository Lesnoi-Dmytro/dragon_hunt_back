import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterRequest from 'src/types/auth/register.type';
import Credentials from 'src/types/auth/credentials.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  public async signin(@Body() credentials: Credentials) {
    return this.authService.signin(credentials.username, credentials.password);
  }

  @Post('/signup')
  public async register(@Body() registerRequest: RegisterRequest) {
    return this.authService.signup(
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
