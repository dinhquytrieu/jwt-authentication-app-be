import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // async create(userData: { email: string; password: string }): Promise<User> {
  //   const existingUser = await this.userModel.findOne({
  //     email: userData.email,
  //   });
  //   if (existingUser) {
  //     throw new BadRequestException('Email is already registered');
  //   }

  //   const hashedPassword = await bcrypt.hash(userData.password, 10);
  //   const newUser = new this.userModel({
  //     email: userData.email,
  //     password: hashedPassword,
  //   });

  //   return newUser.save();
  // }

  async create(userData: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    email: string;
    password: string;
  }): Promise<User> {
    // Check if the email is already registered
    const existingUser = await this.userModel.findOne({
      email: userData.email,
    });
    if (existingUser) {
      throw new BadRequestException('Email is already registered');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create the new user with additional fields
    const newUser = new this.userModel({
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      address: userData.address,
      email: userData.email,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async findById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId);
  }
}
