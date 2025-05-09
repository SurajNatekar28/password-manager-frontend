import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Vault from "./components/Vault";

function App() {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("login");

  if (!token) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Password Manager</h1>
        <button onClick={() => setPage("login")}>Login</button>
        <button onClick={() => setPage("register")}>Register</button>
        {page === "login" && <Login setToken={setToken} />}
        {page === "register" && <Register />}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Password Manager</h1>
      <button onClick={() => setToken(null)}>Logout</button>
      <Vault token={token} />
    </div>
  );
}

export default App;