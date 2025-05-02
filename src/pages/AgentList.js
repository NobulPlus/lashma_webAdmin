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
import { getAllAgents, deleteAgent } from "../services/agentService";
import { toast } from "react-toastify";

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await getAllAgents();
        setAgents(data);
      } catch (error) {
        toast.error("Failed to fetch agents", { position: "top-center" });
      }
    };
    fetchAgents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteAgent(id);
      setAgents(agents.filter((agent) => agent._id !== id));
      toast.success("Agent deleted successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to delete agent", { position: "top-center" });
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
              Marketing Agents
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/agents/create")}
              sx={{
                backgroundColor: "#ef6c00",
                "&:hover": { backgroundColor: "#e65100" },
              }}
            >
              Create Agent
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
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#424242" }}>
                    Agency
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#424242" }}>
                    Phone
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#424242" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow
                    key={agent._id}
                    sx={{
                      "&:hover": { backgroundColor: "#fff8f2" },
                    }}
                  >
                    <TableCell>{agent.name}</TableCell>
                    <TableCell>{agent.agency?.name || "N/A"}</TableCell>
                    <TableCell>{agent.phone}</TableCell>
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
                        onClick={() => navigate(`/agents/edit/${agent._id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(agent._id)}
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

export default AgentList;