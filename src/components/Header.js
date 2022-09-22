import {
  Box,
  AppBar,
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Book, Home, Outlet, School } from "@mui/icons-material";

const Header = () => {
  const [role, setRole] = React.useState("");
  const [teacher, setTeacher] = React.useState("");
  React.useEffect(() => {
    setRole(localStorage.getItem("user_role"));
    setTeacher(localStorage.getItem("teacher_id"));
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            ระบบจัดการหลังบ้าน
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          {role === "SUPER_ADMIN_USER" ? (
            <>
              <List>
                <ListItem button component={Link} to="/school">
                  <ListItemIcon>
                    <School />
                  </ListItemIcon>
                  <ListItemText primary="โรงเรียน" />
                </ListItem>
              </List>
              <List>
                <ListItem button component={Link} to="/module">
                  <ListItemIcon>
                    <Book />
                  </ListItemIcon>
                  <ListItemText primary="หน่วยการเรียนรู้" />
                </ListItem>
              </List>
              <List>
                <ListItem button component={Link} to="/submodule">
                  <ListItemIcon>
                    <Book />
                  </ListItemIcon>
                  <ListItemText primary="หน่วยการเรียนรู้ย่อย" />
                </ListItem>
              </List>
              <List>
                <ListItem
                  button
                  to="/"
                  component={Link}
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  <ListItemIcon>
                    <Outlet />
                  </ListItemIcon>
                  <ListItemText primary="ออกจากระบบ" />
                </ListItem>
              </List>
            </>
          ) : role === "NORMAL_USER_ROLE" ? (
            <>
            <List>
                <List>
                  <ListItem button component={Link} to={`/teacher/profile/${teacher}`}>
                    <ListItemIcon>
                      <Home />
                    </ListItemIcon>
                    <ListItemText primary="หน้าหลัก" />
                  </ListItem>
                </List>
              </List>
              <Divider />
              <List>
                <ListItem
                  button
                  to="/"
                  component={Link}
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  <ListItemIcon>
                    <Outlet />
                  </ListItemIcon>
                  <ListItemText primary="ออกจากระบบ" />
                </ListItem>
              </List>
            </>
          ) : (
            <>
              <List>
                <List>
                  <ListItem button component={Link} to={`/teacher/profile/${teacher}`}>
                    <ListItemIcon>
                      <Home />
                    </ListItemIcon>
                    <ListItemText primary="หน้าหลัก" />
                  </ListItem>
                </List>
              </List>
              <Divider />
              <List>
                <ListItem
                  button
                  to="/"
                  component={Link}
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  <ListItemIcon>
                    <Outlet />
                  </ListItemIcon>
                  <ListItemText primary="ออกจากระบบ" />
                </ListItem>
              </List>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
