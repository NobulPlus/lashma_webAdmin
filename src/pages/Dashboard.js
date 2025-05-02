import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Fade,
} from "@mui/material";
import {
  Article as ArticleIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  LocalHospital as LocalHospitalIcon,
  LocalPharmacy as LocalPharmacyIcon,
} from "@mui/icons-material";

const Dashboard = () => {
  const stats = [
    { title: "Blogs", count: 10, icon: <ArticleIcon />, path: "/blogs" },
    { title: "Agencies", count: 5, icon: <BusinessIcon />, path: "/agencies" },
    { title: "Agents", count: 20, icon: <PeopleIcon />, path: "/agents" },
    {
      title: "Providers",
      count: 15,
      icon: <LocalHospitalIcon />,
      path: "/providers",
    },
    {
      title: "Pharmacies",
      count: 8,
      icon: <LocalPharmacyIcon />,
      path: "/pharmacies",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Fade in timeout={800}>
        <Box>
          <Typography
            variant="h4"
            sx={{ color: "#ef6c00", fontWeight: 700, mb: 4 }}
          >
            Dashboard
          </Typography>
          <Grid container spacing={3}>
            {stats.map((stat) => (
              <Grid item xs={12} sm={6} md={4} key={stat.title}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      transform: "scale(1.03)",
                      transition: "all 0.2s",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "#ffe0b2",
                        borderRadius: 2,
                        mr: 2,
                      }}
                    >
                      {React.cloneElement(stat.icon, {
                        sx: { color: "#ef6c00", fontSize: 40 },
                      })}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ color: "#424242" }}>
                        {stat.title}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{ color: "#ef6c00", fontWeight: 600 }}
                      >
                        {stat.count}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>
    </Container>
  );
};

export default Dashboard;