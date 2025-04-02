import db from '../config/database';

export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserInput {
  name: string;
  email: string;
  age?: number;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  age?: number;
}

class UserModel {
  async findAll(): Promise<User[]> {
    return db('users').select('*');
  }

  async findById(id: number): Promise<User | null> {
    const [user] = await db('users').where({ id }).select('*');
    return user || null;
  }

  async create(userData: CreateUserInput): Promise<User> {
    const [user] = await db('users').insert(userData).returning('*');
    return user;
  }

  async update(id: number, userData: UpdateUserInput): Promise<User | null> {
    const [user] = await db('users')
      .where({ id })
      .update(userData)
      .returning('*');
    return user || null;
  }

  async delete(id: number): Promise<boolean> {
    const count = await db('users').where({ id }).del();
    return count > 0;
  }
}

export default new UserModel(); 