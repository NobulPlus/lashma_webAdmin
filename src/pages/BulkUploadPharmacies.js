import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { bulkUploadPharmacies } from "../services/pharmacyService";
import {
  Container,
  Typography,
  Paper,
  Box,
  Fade,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";

const BulkUploadPharmacies = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await bulkUploadPharmacies(data.file[0]);
      toast.success("Pharmacies uploaded successfully!", {
        position: "top-center",
      });
      navigate("/pharmacies");
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed", {
        position: "top-center",
      });
    }
  };

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
            Bulk Upload Pharmacies
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 3 }}>
              <input
                type="file"
                accept=".xlsx, .xls"
                {...register("file", { required: "File is required" })}
                style={{
                  display: "block",
                  padding: "12px",
                  border: "1px solid #ffe0b2",
                  borderRadius: "8px",
                  width: "100%",
                  backgroundColor: "#fff8f2",
                }}
              />
              {errors.file && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {errors.file.message}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Upload an Excel file (.xlsx or .xls) with columns: name, address, lga
              </Typography>
            </Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
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
              Upload
            </Button>
          </form>
        </Paper>
      </Fade>
    </Container>
  );
};

export default BulkUploadPharmacies;