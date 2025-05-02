import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getAgentById, updateAgent } from "../services/agentService";
import { getAllAgencies } from "../services/agencyService";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Fade,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { toast } from "react-toastify";

const EditAgent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentData, agenciesData] = await Promise.all([
          getAgentById(id),
          getAllAgencies(),
        ]);
        setValue("name", agentData.name);
        setValue("agency", agentData.agency?._id || "");
        setValue("phone", agentData.phone);
        setAgencies(agenciesData);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch agent or agencies", { position: "top-center" });
        navigate("/agents");
      }
    };
    fetchData();
  }, [id, setValue, navigate]);

  const onSubmit = async (data) => {
    try {
      await updateAgent(id, data);
      toast.success("Agent updated successfully!", {
        position: "top-center",
      });
      navigate("/agents");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update agent", {
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
            Edit Marketing Agent
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
            <FormControl fullWidth margin="normal" error={!!errors.agency}>
              <InputLabel>Agency</InputLabel>
              <Select
                {...register("agency", { required: "Agency is required" })}
                label="Agency"
                sx={{
                  borderRadius: 2,
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ef6c00" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#ef6c00" },
                }}
              >
                {agencies.map((agency) => (
                  <MenuItem key={agency._id} value={agency._id}>
                    {agency.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.agency && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {errors.agency.message}
                </Typography>
              )}
            </FormControl>
            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$/,
                  message: "Invalid phone number",
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
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
              Update Agent
            </Button>
          </form>
        </Paper>
      </Fade>
    </Container>
  );
};

export default EditAgent;