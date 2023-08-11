const express = require('express');
const Actions = require('./actions-model');
const { validateAction, validateActionId } = require('./actions-middlware');
const router = express.Router();

router.get('/', (req, res, next) => {
  Actions.get()
    .then(actions => {
      res.json(actions || []);
    })
    .catch(next);
});

router.get('/:id', validateActionId, (req, res, next) => {
  res.json(req.action);
});

router.post('/', validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(next);
});

router.put('/:id', validateAction, validateActionId, (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;

  Actions.update(id, changes)
    .then(action => {
      if (action) {
        res.json(action);
      } else {
        res.status(404).json({ message: 'Action not found' });
      }
    })
    .catch(next);
});

router.delete('/:id', validateActionId, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
