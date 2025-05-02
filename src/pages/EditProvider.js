import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getProviderById, updateProvider } from "../services/providerService";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Fade,
} from "@mui/material";
import { toast } from "react-toastify";

const EditProvider = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const data = await getProviderById(id);
        setValue("name", data.name);
        setValue("address", data.address);
        setValue("lga", data.lga);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch provider", { position: "top-center" });
        navigate("/providers");
      }
    };
    fetchProvider();
  }, [id, setValue, navigate]);

  const onSubmit = async (data) => {
    try {
      await updateProvider(id, data);
      toast.success("Provider updated successfully!", {
        position: "top-center",
      });
      navigate("/providers");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update provider", {
        position: "top-center",
      });
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm">
      <Fade in timeout={800}>
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, sm: 5 },
            mt: 4,
            borderRadius: 4,
            backgroundColor: "#ffffff",
            border: "1px solid #ffe0b2",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "#ef6c00", fontWeight: 700, mb: 4, textAlign: "center" }}
          >
            Edit Provider
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": { borderColor: "#ef6c00" },
                  "&.Mui-focused fieldset": { borderColor: "#ef6c00" },
                },
              }}
            />
            <TextField
              label="Address"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("address", { required: "Address is required" })}
              error={!!errors.address}
              helperText={errors.address?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": { borderColor: "#ef6c00" },
                  "&.Mui-focused fieldset": { borderColor: "#ef6c00" },
                },
              }}
            />
            <TextField
              label="LGA"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("lga", { required: "LGA is required" })}
              error={!!errors.lga}
              helperText={errors.lga?.message}
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
              Update Provider
            </Button>
          </form>
        </Paper>
      </Fade>
    </Container>
  );
};

export default EditProvider;