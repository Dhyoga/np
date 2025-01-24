const express = require('express');
const router = express.Router();
const { validateTask } = require('../middlewares/task');

// Initialize Prisma Client
const prisma = new (require('@prisma/client')).PrismaClient();

// CRUD: Create a task
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post('/', validateTask, async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    const task = await prisma.task.create({
      data: { title, description, completed },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CRUD: Get all tasks
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: A list of tasks
 */
router.get('/', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CRUD: Get a task by ID
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retrieve a task by ID
 *     tags: [Task]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task found
 *       404:
 *         description: Task not found
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CRUD: Update a task
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Task]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.put('/:id', validateTask, async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, description, completed },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CRUD: Delete a task
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Task]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Task deleted successfully', task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
