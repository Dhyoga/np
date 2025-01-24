// routes/task.js
const express = require('express');
const { validateTask } = require('../middlewares/task');
const taskService = require('../services/task');

const router = express.Router();

// Create a new task
router.post('/', validateTask, async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    const task = await taskService.createTask(title, description, completed);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a task by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskService.getTaskById(id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a task
router.put('/:id', validateTask, async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const task = await taskService.updateTask(id, title, description, completed);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskService.deleteTask(id);
    res.json({ message: 'Task deleted successfully', task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
