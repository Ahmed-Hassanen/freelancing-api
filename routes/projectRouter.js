const express = require("express");
const projectController = require("../controllers/projectController");

const router = express.Router();

router
  .route("/")
  .post(projectController.createProject)
  .get(projectController.getAllProjects);

router.route("/:id").
  delete(projectController.deleteProject)
  .patch(projectController.updateProject)
  .get(projectController.getOneProject);
module.exports = router;
