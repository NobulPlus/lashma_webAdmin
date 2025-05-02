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
import { getAllPharmacies, deletePharmacy } from "../services/pharmacyService";
import { toast } from "react-toastify";

const PharmacyList = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const data = await getAllPharmacies();
        setPharmacies(data);
      } catch (error) {
        toast.error("Failed to fetch pharmacies", { position: "top-center" });
      }
    };
    fetchPharmacies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePharmacy(id);
      setPharmacies(pharmacies.filter((pharmacy) => pharmacy._id !== id));
      toast.success("Pharmacy deleted successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to delete pharmacy", { position: "top-center" });
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
              Pharmacies
            </Typography>
            <Box>
              <Button
                variant="contained"
                onClick={() => navigate("/pharmacies/create")}
                sx={{
                  mr: 2,
                  backgroundColor: "#ef6c00",
                  "&:hover": { backgroundColor: "#e65100" },
                }}
              >
                Create Pharmacy
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/pharmacies/bulk-upload")}
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
                {pharmacies.map((pharmacy) => (
                  <TableRow
                    key={pharmacy._id}
                    sx={{
                      "&:hover": { backgroundColor: "#fff8f2" },
                    }}
                  >
                    <TableCell>{pharmacy.name}</TableCell>
                    <TableCell>{pharmacy.address}</TableCell>
                    <TableCell>{pharmacy.lga}</TableCell>
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
                        onClick={() => navigate(`/pharmacies/edit/${pharmacy._id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(pharmacy._id)}
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

export default PharmacyList;