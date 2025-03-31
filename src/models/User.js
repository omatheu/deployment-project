const db = require('../database');

class User {
  static async findAll() {
    return await db('users').select('*');
  }

  static async findById(id) {
    console.log('Finding user with ID:', id);
    const user = await db('users').where({ id }).first();
    console.log('Found user:', user);
    return user;
  }

  static async create(userData) {
    const [id] = await db('users').insert(userData).returning('id');
    return id;
  }

  static async update(id, userData) {
    return await db('users')
      .where({ id })
      .update(userData)
      .returning('*');
  }

  static async delete(id) {
    return await db('users')
      .where({ id })
      .del()
      .returning('*');
  }
}

module.exports = User; 