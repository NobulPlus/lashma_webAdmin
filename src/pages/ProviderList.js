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
import { getAllProviders, deleteProvider } from "../services/providerService";
import { toast } from "react-toastify";

const ProviderList = () => {
  const [providers, setProviders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await getAllProviders();
        setProviders(data);
      } catch (error) {
        toast.error("Failed to fetch providers", { position: "top-center" });
      }
    };
    fetchProviders();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProvider(id);
      setProviders(providers.filter((provider) => provider._id !== id));
      toast.success("Provider deleted successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to delete provider", { position: "top-center" });
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
              Providers
            </Typography>
            <Box>
              <Button
                variant="contained"
                onClick={() => navigate("/providers/create")}
                sx={{
                  mr: 2,
                  backgroundColor: "#ef6c00",
                  "&:hover": { backgroundColor: "#e65100" },
                }}
              >
                Create Provider
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/providers/bulk-upload")}
                sx={{
                  borderColor: "#ef6c00",
                  color: "#ef6c00",
                  "&:hover": { borderColor: "#e65100", color: "#e65100" },
                }}
              >
                Bulk Upload
              </Button>
            </Box>
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
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#424242" }}>
                    Address
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#424242" }}>
                    LGA
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#424242" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {providers.map((provider) => (
                  <TableRow
                    key={provider._id}
                    sx={{
                      "&:hover": { backgroundColor: "#fff8f2" },
                    }}
                  >
                    <TableCell>{provider.name}</TableCell>
                    <TableCell>{provider.address}</TableCell>
                    <TableCell>{provider.lga}</TableCell>
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
                        onClick={() => navigate(`/providers/edit/${provider._id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(provider._id)}
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

export default ProviderList;