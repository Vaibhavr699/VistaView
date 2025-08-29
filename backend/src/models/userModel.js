const bcrypt = require('bcryptjs');
const db = require('../config/db');

module.exports = {
  async create({ name, email, password, role = 'user' }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, role]
    );
    const user = result.rows[0];
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  },

  async findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const row = result.rows[0];
    if (!row) return undefined;
    return {
      id: row.id,
      name: row.username ?? row.name ?? null,
      email: row.email,
      role: row.role,
      password: row.password,
      created_at: row.created_at
    };
  },

  async findById(id) {
    const result = await db.query('SELECT id, name, email, role, created_at FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },

  async findAll() {
    const result = await db.query('SELECT id, name, email, role, created_at FROM users');
    return result.rows;
  },

  async update(id, { name, email, password, status }) {
    const updates = [];
    const params = [];
    let paramIndex = 1;

    if (name) {
      updates.push(`name = $${paramIndex++}`);
      params.push(name);
    }
    if (email) {
      updates.push(`email = $${paramIndex++}`);
      params.push(email);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push(`password = $${paramIndex++}`);
      params.push(hashedPassword);
    }
    if (status) {
      updates.push(`status = $${paramIndex++}`);
      params.push(status);
    }

    if (updates.length === 0) {
      return null;
    }

    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramIndex}`;
    params.push(id);
    
    await db.query(query, params);
    
    // Fetch the updated user to get the correct name field
    const updatedUser = await this.findById(id);
    return updatedUser;
  },

  async delete(id) {
    await db.query('DELETE FROM users WHERE id = $1', [id]);
  }
};