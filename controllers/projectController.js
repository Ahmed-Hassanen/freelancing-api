const Project = require("../models/projectModel");

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({
      status: "success",
      data: project,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    const filters = req.query;
    const filteredProjects = projects.filter((project) => {
      let isValid = true;
      for (key in filters) {
        isValid = isValid && project[key] == filters[key];
      }
      return isValid;
    });
    res.status(201).json({
      status: "success",
      length: filteredProjects.length,
      data: filteredProjects,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
exports;
