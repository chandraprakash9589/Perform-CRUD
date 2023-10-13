import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import express from "express";
const app = express();
app.use(express.json());

// Create a new task
app.post("/tasks", async (req, res) => {
  const { name, email,password } = req.body;
  const task = await prisma.task.create({
    data: {
      name,
      email,
      password
    },
  });
  res.json(task);
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// Get a task by ID
app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(task);
});

// Update a task by ID
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email,password } = req.body;
  const updatedTask = await prisma.task.update({
    where: { id: parseInt(id) },
    data: {
      name,
      email,
      password
    },
  });
  res.json(updatedTask);
});

// Delete a task by ID
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: "Task deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
