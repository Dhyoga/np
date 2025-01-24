// services/taskService.js
const prisma = new (require('@prisma/client')).PrismaClient();

const createTask = async (title, description, completed) => {
  try {
    return await prisma.task.create({
      data: { title, description, completed },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllTasks = async () => {
  try {
    return await prisma.task.findMany();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTaskById = async (id) => {
  try {
    return await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateTask = async (id, title, description, completed) => {
  try {
    return await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, description, completed },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteTask = async (id) => {
  try {
    return await prisma.task.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
