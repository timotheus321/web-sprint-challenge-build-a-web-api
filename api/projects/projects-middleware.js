// add middlewares here related to projects
const Projects = require('./projects-model');
function validateProject(req, res, next) {
    const { name, description, completed } = req.body;
    if (!name || !description || completed === undefined) {
      return res.status(400).json({ message: 'missing required fields' });
    } else {
      next();
    }
  }

  // function validateProjectId(req, res, next) {
  //   const { id } = req.params;
  //   console.log("yup")
  //   next()
  // //   Projects.get(id)
  // //     .then(project => {
  // //       if (project) {
  // //         req.project = project;
  // //         next();
  // //       } else {
  // //         res.status(404).json({ message: 'Project not found' });
  // //       }
  // //     })
  // //     .catch(err => {
  // //       res.status(500).json({ message: 'Failed to check project existence' });
  // //     }); 
  //  }
  function validateProjectId(req, res, next) {
    const { id } = req.params;
    console.log("ID extracted:", id);
    
    Projects.get(id)
      .then(project => {
        console.log("Project retrieved:", project);
        if (project) {
          req.project = project;
          next();
        } else {
          console.log("Project not found");
          res.status(404).json({ message: 'Project not found' });
        }
      })
      .catch(err => {
        console.log("Error checking project existence:", err);
        res.status(500).json({ message: 'Failed to check project existence' });
      });
  }
  

module.exports = {
    validateProject,
    validateProjectId
};