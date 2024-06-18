const express = require('express');
const { Todo } = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

router.get('/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  res.json(todo);
});

router.post('/', async (req, res) => {
  const todo = await Todo.create(req.body);
  res.json(todo);
});

router.patch('/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  await todo.update(req.body);
  res.json(todo);
});

router.delete('/:id', async (req, res) => {
  await Todo.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
});

module.exports = router;
