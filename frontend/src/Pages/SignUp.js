import React, { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignUp();

  const handelSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };
  return (
    <form className="signup" onSubmit={handelSubmit}>
      <h3>Sign Up</h3>
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default SignUp;
