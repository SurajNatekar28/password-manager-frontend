import { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API}/auth/register`, { email, password });
      setMessage("Registered successfully!");
    } catch (err) {
      setMessage("Registration failed. Email might already exist.");
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-3">Register</h2>
      {message && <Alert variant={message.includes("success") ? "success" : "danger"}>{message}</Alert>}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
        </Form.Group>
        <Button variant="success" onClick={register} block="true">Register</Button>
      </Form>
    </Container>
  );
}

export default Register;
