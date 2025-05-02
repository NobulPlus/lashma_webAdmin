import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Fade,
  Link as MuiLink,
} from "@mui/material";
import { toast } from "react-toastify";
import logo from "../assets/logo.png"; // Add a logo in src/assets

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Login successful!", { position: "top-center" });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", {
        position: "top-center",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ffe0b2 0%, #fff8f2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 0 },
      }}
    >
      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              backgroundColor: "#ffffff",
              border: "1px solid #ffe0b2",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box textAlign="center" mb={4}>
              <img
                src={logo}
                alt="LASHMA Logo"
                style={{ width: 100, marginBottom: 16 }}
              />
              <Typography
                variant="h4"
                sx={{ color: "#ef6c00", fontWeight: 700, mb: 1 }}
              >
                Admin Login
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to manage your LASHMA dashboard
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                variant="outlined"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#ef6c00" },
                    "&.Mui-focused fieldset": { borderColor: "#ef6c00" },
                  },
                }}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#ef6c00" },
                    "&.Mui-focused fieldset": { borderColor: "#ef6c00" },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: 600,
                  backgroundColor: "#ef6c00",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#e65100",
                    transform: "scale(1.02)",
                    transition: "all 0.2s",
                  },
                }}
              >
                Login
              </Button>
              <Box mt={2} textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{" "}
                  <MuiLink
                    component={Link}
                    to="/register"
                    sx={{ color: "#ef6c00", fontWeight: 500 }}
                  >
                    Register
                  </MuiLink>
                </Typography>
              </Box>
            </form>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;