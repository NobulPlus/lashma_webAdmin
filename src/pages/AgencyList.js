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
import { getAllAgencies, deleteAgency } from "../services/agencyService";
import { toast } from "react-toastify";

const AgencyList = () => {
  const [agencies, setAgencies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const data = await getAllAgencies();
        setAgencies(data);
      } catch (error) {
        toast.error("Failed to fetch agencies", { position: "top-center" });
      }
    };
    fetchAgencies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteAgency(id);
      setAgencies(agencies.filter((agency) => agency._id !== id));
      toast.success("Agency deleted successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to delete agency", { position: "top-center" });
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
              Marketing Agencies
            </Typography>
            <Box>
              <Button
                variant="contained"
                onClick={() => navigate("/agencies/create")}
                sx={{
                  mr: 2,
                  backgroundColor: "#ef6c00",
                  "&:hover": { backgroundColor: "#e65100" },
                }}
              >
                Create Agency
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/agencies/bulk-upload")}
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
                    Phone Number
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#424242" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {agencies.map((agency) => (
                  <TableRow
                    key={agency._id}
                    sx={{
                      "&:hover": { backgroundColor: "#fff8f2" },
                    }}
                  >
                    <TableCell>{agency.name}</TableCell>
                    <TableCell>{agency.phoneNumber}</TableCell>
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
                        onClick={() => navigate(`/agencies/edit/${agency._id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(agency._id)}
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

export default AgencyList;