import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogById, updateBlog } from "../services/blogService";
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

const EditBlog = () => {
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
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setValue("title", data.title);
        setValue("content", data.content);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch blog", { position: "top-center" });
        navigate("/blogs");
      }
    };
    fetchBlog();
  }, [id, setValue, navigate]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    if (data.image[0]) formData.append("image", data.image[0]);

    try {
      await updateBlog(id, formData);
      toast.success("Blog updated successfully!", {
        position: "top-center",
      });
      navigate("/blogs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update blog", {
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
            Edit Blog
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
                {...register("image")}
                style={{
                  display: "block",
                  padding: "12px",
                  border: "1px solid #ffe0b2",
                  borderRadius: "8px",
                  width: "100%",
                  backgroundColor: "#fff8f2",
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Upload a new image (optional)
              </Typography>
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
              Update Blog
            </Button>
          </form>
        </Paper>
      </Fade>
    </Container>
  );
};

export default EditBlog;