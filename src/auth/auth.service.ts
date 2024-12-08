import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import axios from 'axios';
import GoogleResponse from './types/googleResponse.type';
import { generate } from 'generate-password';
import AuthResponse from './types/authResponse.type';
import { comparePassword, hashPassword } from 'src/utils/auth/passwordEncoder';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  public async signin(
    username: string,
    password: string,
  ): Promise<AuthResponse> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: username,
      },
    });

    if (!user || !(await comparePassword(password, user.password))) {
      throw new ForbiddenException('Invalid Credentials');
    }

    return this.generateAuthResponse(user);
  }

  public async signup(
    email: string,
    name: string,
    password: string,
    image?: string,
  ): Promise<AuthResponse> {
    password = await hashPassword(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password,
        image,
      },
    });

    return this.generateAuthResponse(user);
  }

  public async authWithGoogle(access_token: string): Promise<AuthResponse> {
    let userInfo: GoogleResponse;
    try {
      userInfo = (
        await axios.get<GoogleResponse>(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: { Authorization: 'Bearer ' + access_token },
          },
        )
      ).data;
    } catch (err) {
      console.log(err);
      throw new ForbiddenException("Can't get user's Google profile");
    }

    const user = await this.prisma.user.findFirst({
      where: {
        email: userInfo.email,
      },
    });

    if (!user) {
      return this.signup(
        userInfo.email,
        userInfo.name,
        generate(),
        userInfo.picture,
      );
    }

    return this.generateAuthResponse(user);
  }

  private async generateAuthResponse(user: User): Promise<AuthResponse> {
    return {
      id: String(user.id),
      email: user.email,
      name: user.name,
      image: user.image,
      token: await this.generateToken(user),
    };
  }

  private async generateToken(user: User) {
    return this.jwtService.signAsync({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
  }
}
