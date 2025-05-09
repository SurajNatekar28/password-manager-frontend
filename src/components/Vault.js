import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Button, ListGroup, Row, Col, Alert } from "react-bootstrap";

function Vault({ token }) {
  const [vault, setVault] = useState([]);
  const [site, setSite] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVault = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/vault/get`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setVault(res.data);
      } catch {
        setError("Failed to load vault.");
      }
    };
    fetchVault();
  }, [token]);

  const addPassword = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API}/vault/add`, { site_name: site, password: newPassword }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const res = await axios.get(`${process.env.REACT_APP_API}/vault/get`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVault(res.data);
      setSite(""); setNewPassword(""); setError("");
    } catch {
      setError("Failed to add password.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">🔐 Your Vault</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <ListGroup className="mb-4">
        {vault.map((entry, i) => (
          <ListGroup.Item key={i}>
            <strong>{entry.site_name}</strong>: {entry.password}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h4>Add New Password</h4>
      <Row>
        <Col>
          <Form.Control placeholder="Site" value={site} onChange={e => setSite(e.target.value)} />
        </Col>
        <Col>
          <Form.Control placeholder="Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        </Col>
        <Col xs="auto">
          <Button onClick={addPassword}>Add</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Vault;
