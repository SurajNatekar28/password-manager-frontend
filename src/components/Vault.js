import { useEffect, useState } from "react";
import axios from "axios";

function Vault({ token }) {
  const [vault, setVault] = useState([]);
  const [site, setSite] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    fetchVault();
  }, []);

  const fetchVault = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/vault/get`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setVault(res.data);
    } catch (err) {
      alert("Failed to load vault.");
    }
  };

  const addPassword = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API}/vault/add`, {
        site_name: site,
        password: newPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Password added.");
      fetchVault();
      setSite(""); setNewPassword("");
    } catch (err) {
      alert("Failed to add password.");
    }
  };

  return (
    <div>
      <h2>🔐 Your Vault</h2>
      <ul>
        {vault.map((entry, index) => (
          <li key={index}>
            <strong>{entry.site_name}</strong>: {entry.password}
          </li>
        ))}
      </ul>
      <h3>Add New Password</h3>
      <input placeholder="Site" value={site} onChange={e => setSite(e.target.value)} />
      <input placeholder="Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
      <button onClick={addPassword}>Add</button>
    </div>
  );
}

export default Vault;
