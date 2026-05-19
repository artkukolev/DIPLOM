import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  History as HistoryIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Article as ArticleIcon,
} from "@mui/icons-material";
import { useState } from "react";
import type { ReactNode } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const drawerWidth = 280;

const navItems = [
  { label: "Дашборд", to: "/", icon: <DashboardIcon /> },
  { label: "Учащиеся", to: "/students", icon: <PeopleIcon /> },
  { label: "Уведомления", to: "/notifications", icon: <NotificationsIcon /> },
  {
    label: "Отчёты",
    to: "/reports",
    icon: <ArticleIcon />,
    roles: ["admin", "director", "tutor", "headTeacher", "secretary"],
  },
  { label: "История", to: "/audit", icon: <HistoryIcon /> },
  { label: "Профиль", to: "/profile", icon: <PersonIcon /> },
];

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
        color: "#e2e8f0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar
        sx={{
          background: "linear-gradient(90deg, #4f46e5 0%, #0f172a 100%)",
          color: "white",
        }}
      >
        <Typography
          variant="h6"
          noWrap
          sx={{ fontWeight: 700, letterSpacing: 1 }}
        >
          SchoolPupil+
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1, px: 1 }}>
        {navItems
          .filter(
            (nav) => !nav.roles || nav.roles.includes(user?.role ?? "admin"),
          )
          .map((nav) => (
            <ListItemButton
              key={nav.label}
              component={RouterLink}
              to={nav.to}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 3,
                mb: 1,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.1)",
                  transform: "translateX(4px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#c7d2fe" }}>{nav.icon}</ListItemIcon>
              <ListItemText
                primary={nav.label}
                sx={{ "& .MuiTypography-root": { fontWeight: 500 } }}
              />
            </ListItemButton>
          ))}
      </List>
      <Divider />
      <List sx={{ px: 1 }}>
        <ListItemButton
          onClick={onLogout}
          sx={{
            borderRadius: 3,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(244, 67, 54, 0.1)",
              transform: "translateX(4px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#e53935" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Выход"
            sx={{ "& .MuiTypography-root": { fontWeight: 500 } }}
          />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(90deg, #0f172a 0%, #111827 100%)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
          borderBottom: "1px solid rgba(148,163,184,0.12)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              transition: "transform 0.2s ease",
              "&:hover": { transform: "scale(1.1)" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Школьный реестр
          </Typography>
          <Typography
            variant="subtitle2"
            component="span"
            sx={{ mx: 2, opacity: 0.9 }}
          >
            {user?.name} ({user?.role})
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="Навигация"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRadius: "0 20px 20px 0",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRadius: "0 20px 20px 0",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              border: "none",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          background: "linear-gradient(135deg, #020617 0%, #111827 100%)",
          color: "#e2e8f0",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            animation: "fadeIn 0.5s ease-in-out",
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(20px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
