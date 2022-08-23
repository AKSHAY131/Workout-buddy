import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

function WorkoutForm() {
  const { dispatch } = useWorkoutContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState([]);
  const { user } = useAuthContext();
  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      setError("Must Be Login");
      return;
    }
    const workout = { title, load, reps };

    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      setEmpty(json.empty);
    }
    if (res.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmpty("");

      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  }
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a nw Workout</h3>
      <label>Exersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={empty.includes("title") ? "error" : ""}
      />
      <label>Load (in Kg):</label>

      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={empty.includes("load") ? "error" : ""}
      />
      <label>Reps:</label>

      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={empty.includes("reps") ? "error" : ""}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
