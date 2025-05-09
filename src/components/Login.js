import React, { useState } from "react";
import axios from "axios";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/auth/login`, {
        email,
        password
      });
      alert("Login successful!");
      setToken(res.data.token);
    } catch (err) {
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
