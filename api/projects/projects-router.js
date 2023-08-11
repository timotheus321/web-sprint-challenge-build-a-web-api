const express = require('express');
const Projects = require('./projects-model'); // Make sure to define this model
const router = express.Router();

const { validateProject, validateProjectId } = require('./projects-middleware')

router.get('/', (req, res, next) => {
  Projects.get()
    .then(projects => {
      res.json(projects || []);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Projects.get(id)
      .then(project => {
        if (project) {
          res.json(project);
        } else {
          res.status(404).json({ message: 'Project not found' });
        }
      })
      .catch(next);
  });
  

    router.post('/', validateProject, (req, res, next) => {
        Projects.insert(req.body)
          .then(project => {
            res.status(201).json(project);
          })
          .catch(next);
      });

      router.put('/:id', validateProject, (req, res, next) => {
        const { id } = req.params;
        const changes = req.body;
      
        Projects.update(id, changes)
          .then(project => {
            if (project) {
              res.json(project);
            } else {
              res.status(404).json({ message: 'Project not found' });
            }
          })
          .catch(next);
      });
      router.delete('/:id', validateProjectId, async (req, res, next) => {
        try {
          await Projects.remove(req.params.id);
          res.status(204).end();
        } catch (error) {
          next(error);
        }
      });
  
      
  
      router.get('/:id/actions', validateProjectId, (req, res, next) => {
        Projects.getProjectActions(req.params.id)
          .then(actions => {
            res.json(actions || []);
          })
          .catch(next);
      });
      
      
module.exports = router;
