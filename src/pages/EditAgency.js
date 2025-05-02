import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getAgencyById, updateAgency } from "../services/agencyService";
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

const EditAgency = () => {
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
    const fetchAgency = async () => {
      try {
        const data = await getAgencyById(id);
        setValue("name", data.name);
        setValue("phoneNumber", data.phoneNumber);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch agency", { position: "top-center" });
        navigate("/agencies");
      }
    };
    fetchAgency();
  }, [id, setValue, navigate]);

  const onSubmit = async (data) => {
    try {
      await updateAgency(id, data);
      toast.success("Agency updated successfully!", {
        position: "top-center",
      });
      navigate("/agencies");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update agency", {
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
            Edit Marketing Agency
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
              label="Phone Number"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$/,
                  message: "Invalid phone number",
                },
              })}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
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
              Update Agency
            </Button>
          </form>
        </Paper>
      </Fade>
    </Container>
  );
};

export default EditAgency;