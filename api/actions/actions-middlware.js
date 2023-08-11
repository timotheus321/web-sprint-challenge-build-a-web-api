// add middlewares here related to actions
const Actions = require('./actions-model');

function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
      return res.status(400).json({ message: 'missing required fields' });
    } else {
      next();
    }
  }
  
  function validateActionId(req, res, next) {
    const { id } = req.params;
    Actions.get(id)
      .then(action => {
        if (action) {
          req.action = action;
          next();
        } else {
          res.status(404).json({ message: 'Action not found' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to check action existence' });
      });
  }
  
  module.exports = {
    validateAction,
    validateActionId
  };
  