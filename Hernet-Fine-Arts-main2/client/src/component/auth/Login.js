import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4000/profile", {
        headers: {
          Authorization: token,
        },
      })
      .then(() => navigate("/profile"))
      .catch(() => {
        navigate("/login");
      });
  }, []);

  const handleLogin = () => {
    axios
      .post("http://localhost:4000/login", { username, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        console.log("User logged in successfully");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Login failed:", error.response.data.message);
        alert(error.response.data.message || "Login failed");
      });
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
      />
     <button
  type="submit"
  onClick={handleLogin}
  style={{
    fontSize: "14px",
    padding: "2px 12px",
    backgroundColor: "#cceeff",
    border: "1px solid #99ddff",
    borderRadius: "4px",
    color: "#003366",
    cursor: "pointer",
  }}
>
  Login
</button>

      <p  style={{
      background: "White"}}>
      Don't have an account?{" "}
  <button
    onClick={() => navigate("/register")}
    style={{
      background: "White",
      border: "none",
      color: "#80bfff",
      cursor: "pointer",
      fontSize: "18px",
      padding: 0,
    }}
  >
    Register
  </button>
</p>
    </div>
  );
};

export default Login;