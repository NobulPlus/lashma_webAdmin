import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Fade,
  Paper,
} from "@mui/material";
import { getAllBlogs, deleteBlog } from "../services/blogService";
import { toast } from "react-toastify";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (error) {
        toast.error("Failed to fetch blogs", { position: "top-center" });
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to delete blog", { position: "top-center" });
    }
  };

  return (
    <Container maxWidth="lg">
      <Fade in timeout={800}>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#ef6c00", fontWeight: 700 }}
            >
              Blogs
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/blogs/create")}
              sx={{
                backgroundColor: "#ef6c00",
                "&:hover": { backgroundColor: "#e65100" },
              }}
            >
              Create Blog
            </Button>
          </Box>
          <Paper
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#ffe0b2" }}>
                  <TableCell sx={{ fontWeight: 600, color: "#424242" }}>
                    Title
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#424242" }}>
                    Content Preview
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#424242" }}>
                    Image
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#424242" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow
                    key={blog._id}
                    sx={{
                      "&:hover": { backgroundColor: "#fff8f2" },
                    }}
                  >
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.content}</TableCell>
                    <TableCell>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        style={{ width: 50, borderRadius: 4 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          mr: 1,
                          color: "#ef6c00",
                          borderColor: "#ef6c00",
                          "&:hover": { borderColor: "#e65100", color: "#e65100" },
                        }}
                        onClick={() => navigate(`/blogs/edit/${blog._id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(blog._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </Fade>
    </Container>
  );
};

export default BlogList;