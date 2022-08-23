const express = require("express");
const {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
//req. auth for all workout
router.use(requireAuth);
//to get all workout
router.get("/", getAllWorkouts);

//to single workout
router.get("/:id", getSingleWorkout);

//Post a new workout
router.post("/", createWorkout);

//Delete a new workout
router.delete("/:id", deleteWorkout);
//update a new workout
router.patch("/:id", updateWorkout);

module.exports = router;
