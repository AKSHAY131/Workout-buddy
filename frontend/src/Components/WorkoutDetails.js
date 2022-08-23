import React from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
function WorkoutDetails({ item }) {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }
    const res = await fetch("/api/workouts/" + item._id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{item.title}</h4>
      <p>
        <strong>Load (kg):</strong>
        {item.load}
      </p>
      <p>
        <strong>Reps :</strong> {item.reps}
      </p>
      <p>{formatDistanceToNow(new Date(item.createdAt), { adSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
}

export default WorkoutDetails;
