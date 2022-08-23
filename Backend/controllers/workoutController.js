const Worktout = require("../models/workoutModel");
const mongoose = require("mongoose");
// -----------------------------------------------------------//
//get all workout
const getAllWorkouts = async (req, res) => {
  try {
    const user_id = req.user._id;
    //get all doc from db -1 means new on top
    const worktout = await Worktout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(worktout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// -----------------------------------------------------------//
//get single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }
  //get single doc to db
  const worktout = await Worktout.findById(id);
  if (!worktout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(worktout);
};

// -----------------------------------------------------------//
//creat a workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  let empty = [];
  if (!title) {
    empty.push("title");
  }
  if (!load) {
    empty.push("load");
  }
  if (!reps) {
    empty.push("reps");
  }

  if (empty.length > 0) {
    return res.status(400).json({ error: "Please fill all the fields", empty });
  }
  try {
    //add doc to db
    const user_id = req.user._id;
    const worktout = await Worktout.create({ title, load, reps, user_id });
    res.status(200).json(worktout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// -----------------------------------------------------------//
//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }
  //add doc to db
  const worktout = await Worktout.findByIdAndDelete({ _id: id });
  if (!worktout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(worktout);
};
// -----------------------------------------------------------//
//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  //add doc to db
  const worktout = await Worktout.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!worktout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(worktout);
};
module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
