import React, { useEffect } from "react";
import WorkoutDetails from "../Components/WorkoutDetails";
import WorkoutForm from "../Components/WorkoutForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
function Home() {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  async function fetchWorkout() {
    const res = await fetch("/api/workouts/", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "SET_WORKOUT", payload: json });
    }
  }
  useEffect(() => {
    if (user) {
      fetchWorkout();
    }
  }, [user]);
  return (
    <div className="home">
      <div className="workout">
        {workouts &&
          workouts.map((item) => {
            return <WorkoutDetails key={item._id} item={item} />;
          })}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
