const { Router } = require('express');
const productRouter = new Router();

productRouter.get('/:model', async (req, res) => {
  const modelName = req.params.model;

  try {
    const products = await Model.findAll(); // Или другой запрос к БД
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the products' });
  }
});
