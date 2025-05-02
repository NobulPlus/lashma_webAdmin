import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../services/blogService";
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

const CreateBlog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image", data.image[0]);

    try {
      await createBlog(formData);
      toast.success("Blog created successfully!", {
        position: "top-center",
      });
      navigate("/blogs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create blog", {
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
            Create Blog
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": { borderColor: "#ef6c00" },
                  "&.Mui-focused fieldset": { borderColor: "#ef6c00" },
                },
              }}
            />
            <TextField
              label="Content"
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
              {...register("content", { required: "Content is required" })}
              error={!!errors.content}
              helperText={errors.content?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": { borderColor: "#ef6c00" },
                  "&.Mui-focused fieldset": { borderColor: "#ef6c00" },
                },
              }}
            />
            <Box sx={{ mb: 3 }}>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: "Image is required" })}
                style={{
                  display: "block",
                  padding: "12px",
                  border: "1px solid #ffe0b2",
                  borderRadius: "8px",
                  width: "100%",
                  backgroundColor: "#fff8f2",
                }}
              />
              {errors.image && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {errors.image.message}
                </Typography>
              )}
            </Box>
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
              Create Blog
            </Button>
          </form>
        </Paper>
      </Fade>
    </Container>
  );
};

export default CreateBlog;