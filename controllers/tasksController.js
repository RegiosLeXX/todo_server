import { pool } from "../config/db.js";

export let getTasks = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [req.user.userId]);
        res.json(result.rows.sort((a, b) => a.id - b.id));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export let addNewOneTask = async (req, res) => {
    const { done, description } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO tasks (description, done, user_id) VALUES ($1, $2, $3) RETURNING *',
            [description, done, req.user.userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export let updateTask = async (req, res) => {
    const { id } = req.params;
    const { description, done } = req.body;

    try {
        const taskResult = await pool.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [id, req.user.userId]);
        if (taskResult.rows.length === 0) {
            return res.status(404).json({ error: 'Задача не найдена или не принадлежит пользователю' });
        }

        const updateResult = await pool.query(
            'UPDATE tasks SET description = $1, done = $2 WHERE id = $3 RETURNING *',
            [description, done, id]
        );
        res.json(updateResult.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export let deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const taskResult = await pool.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [id, req.user.userId]);
        if (taskResult.rows.length === 0) {
            return res.status(404).json({ error: 'Задача не найдена или не принадлежит пользователю' });
        }

        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}