const express = require("express");
const projectController = require("../controllers/projectController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(authController.protect, projectController.createProject)
  .get(authController.protect, projectController.getAllProjects);

router
  .route("/:id")
  .patch(authController.protect, projectController.updateProject)
  .get(authController.protect, projectController.getOneProject)
  .delete(authController.protect, projectController.deleteProject);
module.exports = router;
