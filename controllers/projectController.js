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
    res.status(201).json({
      status: "success",
      results: projects.length,
      data: projects,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({
        status: "fail",
        message: "project not found",
      });
    }
    res.status(204).json({
      status: "success",
      message: "project deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
  exports.getOneProject = async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({
          status: "fail",
          message: "project not found",
        });
      }
      res.status(200).json({
        status: "success",
        data: {
          project,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  };

  exports.updateProject = async (req, res) => {
    try {
      const projects = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!projects) {
        return res.status(404).json({
          status: "fail",
          message: "project not found",
        });
      }
      res.status(200).json({
        status: "success",
        data: {
          projects,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  };
};
