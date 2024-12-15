import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { generate } from 'generate-password';
import { comparePassword, hashPassword } from 'src/utils/auth/passwordEncoder';
import AuthResponse from 'src/types/auth/authResponse.type';
import GoogleResponse from 'src/types/auth/googleResponse.type';
import { GoogleService } from 'src/google.service';
import axios from 'axios';
import { console } from 'inspector';
import initialCharacters from 'src/utils/characters/initializeCharacters';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly googleService: GoogleService,
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
    await this.createCharacters(user.id);

    return this.generateAuthResponse(user);
  }

  public async authWithGoogle(access_token: string): Promise<AuthResponse> {
    let userInfo: GoogleResponse;
    try {
      userInfo = await this.googleService.getUserData(access_token);
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
      const userImageResponse = await axios.get(userInfo.picture, {
        responseType: 'arraybuffer',
      });
      const image = await this.googleService.uploadFile(
        userImageResponse.data,
        `${userInfo.email}_${new Date().getTime()}`,
      );

      return this.signup(userInfo.email, userInfo.name, generate(), image);
    }

    return this.generateAuthResponse(user);
  }

  private async generateAuthResponse(user: User): Promise<AuthResponse> {
    return {
      id: String(user.id),
      email: user.email,
      name: user.name,
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

  public async createCharacters(userId: number) {
    initialCharacters.forEach(
      async (character) =>
        await this.prisma.character.create({
          data: {
            ...character,
            user: { connect: { id: userId } },
          },
        }),
    );
  }
}
