import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Send a POST request to the login endpoint
      const response = await axios.post('http://localhost:8080/login', { username, password });
      console.log(response.data)
      if (response?.data) {
        localStorage.setItem('authToken', response.data); // Store token in localStorage
        console.log("Token before navigating:", localStorage.getItem('authToken'));
        navigate(`/`); // Redirect on successful login
      } else {
        
        throw new Error('Invalid response from server'); // Handle unexpected response
      }
    } catch (err) {

      // Set error message for the user
      setError(err.response?.data?.message || 'Invalid username or password.');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{ p: 4, border: '1px solid #ddd', borderRadius: 2, maxWidth: 400 }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </Grid>
  );
};

export default Login;
