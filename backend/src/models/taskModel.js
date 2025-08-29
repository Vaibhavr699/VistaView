const db = require('../config/db');

class Task {
  static async create(taskData) {
    const { title, description, userId, status = 'pending' } = taskData;
        const result = await db.query(
      'INSERT INTO tasks (title, description, user_id, status) VALUES ($1, $2, $3, $4) RETURNING id',
      [title, description, userId, status]
    );
    return { id: result.rows[0].id, title, description, user_id: userId, status };
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await db.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
    return result.rows;
  }

  static async update(id, taskData) {
    const { title, description, status } = taskData;
    const updates = [];
    const params = [];
    let paramIndex = 1;

    if (title) {
      updates.push(`title = $${paramIndex++}`);
      params.push(title);
    }
    if (description) {
      updates.push(`description = $${paramIndex++}`);
      params.push(description);
    }
    if (status) {
      updates.push(`status = $${paramIndex++}`);
      params.push(status);
    }

    if (updates.length === 0) {
      return null;
    }

    const query = `UPDATE tasks SET ${updates.join(', ')} WHERE id = $${paramIndex}`;
    params.push(id);

    await db.query(query, params);
    return { id, title, description, status };
  }

  static async delete(id) {
    await db.query('DELETE FROM tasks WHERE id = $1', [id]);
    return { message: 'Task deleted successfully' };
  }
}

module.exports = Task;