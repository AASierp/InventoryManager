import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (username && password) {
      navigate("/home");
    }
  }

  return (
    <div>
      <form className="login-form" onSubmit={handleLogin}>
        <fieldset className="form">
          <legend>Login</legend>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" type="submit">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}
