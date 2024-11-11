// import { Injectable } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcryptjs';

// @Injectable()
// export class AuthService {
//   constructor(
//     private usersService: UsersService,
//     private jwtService: JwtService,
//   ) {}

//   async register(email: string, password: string): Promise<any> {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await this.usersService.create({
//       email,
//       password: hashedPassword,
//     });
//     return user;
//   }

//   async login(email: string, password: string): Promise<any> {
//     const user = await this.usersService.findByEmail(email);
//     if (user && (await bcrypt.compare(password, user.password))) {
//       const payload = { email: user.email, sub: user._id };
//       return { token: this.jwtService.sign(payload) };
//     }
//     throw new Error('Invalid credentials');
//   }
// }

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    email: string,
    password: string,
  ) {
    return this.usersService.create({
      firstName,
      lastName,
      phone,
      address,
      email,
      password,
    });
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, sub: user._id };
      return { token: this.jwtService.sign(payload), user };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async validateUser(userId: string) {
    return this.usersService.findById(userId);
  }
}
