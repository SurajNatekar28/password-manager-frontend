import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Vault from "./components/Vault";
import { Container, Button } from "react-bootstrap";

function App() {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("login");

  return (
    <Container className="mt-4">
      <h1 className="text-center">Password Manager</h1>
      {!token ? (
        <>
          <div className="text-center mb-3">
            <Button variant="primary" onClick={() => setPage("login")} className="me-2">Login</Button>
            <Button variant="secondary" onClick={() => setPage("register")}>Register</Button>
          </div>
          {page === "login" && <Login setToken={setToken} />}
          {page === "register" && <Register />}
        </>
      ) : (
        <>
          <div className="text-end">
            <Button variant="outline-danger" onClick={() => setToken(null)}>Logout</Button>
          </div>
          <Vault token={token} />
        </>
      )}
    </Container>
  );
}

export default App;
