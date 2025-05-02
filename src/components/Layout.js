import React, { useState } from "react";
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Article as ArticleIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  LocalHospital as LocalHospitalIcon,
  LocalPharmacy as LocalPharmacyIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { logout } from "../services/authService";
import logo from "../assets/logo.png";

const drawerWidth = 240;

const Layout = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const drawerContent = (
    <Box sx={{ p: 3, backgroundColor: "#fff8f2", height: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <img src={logo} alt="LASHMA Logo" style={{ width: 40, marginRight: 8 }} />
        <Typography variant="h6" sx={{ color: "#ef6c00", fontWeight: 700 }}>
          LASHMA
        </Typography>
      </Box>
      <List>
        {[
          { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
          { text: "Blogs", path: "/blogs", icon: <ArticleIcon /> },
          { text: "Agencies", path: "/agencies", icon: <BusinessIcon /> },
          { text: "Agents", path: "/agents", icon: <PeopleIcon /> },
          { text: "Providers", path: "/providers", icon: <LocalHospitalIcon /> },
          { text: "Pharmacies", path: "/pharmacies", icon: <LocalPharmacyIcon /> },
        ].map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&:hover": {
                backgroundColor: "#ffe0b2",
                "& .MuiListItemIcon-root": { color: "#ef6c00" },
              },
              "&.Mui-selected": {
                backgroundColor: "#ffe0b2",
                "& .MuiListItemIcon-root": { color: "#ef6c00" },
              },
            }}
          >
            <ListItemIcon sx={{ color: "#757575" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: "#424242" }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "#ef6c00",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            LASHMA Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              fontWeight: 500,
              "&:hover": { backgroundColor: "#e65100" },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #ffe0b2",
          },
        }}
      >
        <Toolbar />
        {drawerContent}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;