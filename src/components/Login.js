import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  const handleCloseSnack = () => setSnack({ ...snack, open: false });

  const login = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/auth/login`, {
        email,
        password,
      });
      setSnack({ open: true, message: "Login successful!", severity: "success" });
      setToken(res.data.token);
    } catch (err) {
      setSnack({ open: true, message: "Login failed. Check credentials.", severity: "error" });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f4f6f8",
      }}
    >
      <Card sx={{ width: 360, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Sign In
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={login}
          >
            Login
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snack.severity} onClose={handleCloseSnack}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Login;
