import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AuthService from "../../services/AuthService";
import UsuarioService from "../../services/UsuarioService";
import { Link } from "react-router-dom";
import Logotipo from "../../src/assets/icons/logotipoChargeUp.png";
import Fotousuario from "../../src/assets/icons/IconoPerfilUsuario.svg";
const drawerWidth = 150;

function Sidebar(props) {
  const { window, setActiveTab } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      UsuarioService.getUsuarioActual()
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los detalles del usuario:", error);
        });
    }
  }, []);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const drawer = (
    <div>
      <Toolbar className="bg-slate-700" />

      <Divider />

      <List className="position fixed h-[100vh]">
        {["Usuarios", "Estaciones", "Vehiculos", "Valoraciones"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                console.log(`Switching to tab: ${text.toLowerCase()}`);
                setActiveTab(text.toLowerCase());
              }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: "#334155",
        }}
      >
        <Toolbar className=" flex justify-between">
          
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            
            <MenuIcon />
          </IconButton>
          <Typography variant="h6"  component="div">
            Panel Administrador
          </Typography>

          <nav >
          <Link  to="/home">
          <img
            className="w-14"
            src={Logotipo}
            alt="Logotipo"
          />
        </Link>
          </nav>
          


          {AuthService.isAuthenticated() && (
            
            <div className="relative ">
              <button
                id="dropdownUserAvatarButton"
                onClick={handleUserMenuToggle}
                className="h-12 w-12 flex text-sm bg-gray-800 rounded-full  focus:ring-gray-300 "
                type="button"
              >
                <span className="sr-only border">Open user menu</span>
                <div className="w-[48px] h-[48px] rounded-full overflow-hidden flex justify-center items-center bg-white">
                  {user && user.foto ? (
                    <img
                      src={`data:image/jpeg;base64,${user.foto}`}
                      alt="user photo"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <img
                      src={Fotousuario}
                      alt="user photo"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
              </button>

              {isUserMenuOpen && (
                <div
                  id="dropdownAvatar"
                  className="absolute right-0 mt-2 w-72 bg-slate-700 divide-y divide-gray-600 rounded-md shadowz-20 border-2 border-gray-600 "
                >
                  <div className="text-lg px-4 py-3 text-white">
                    <div>{user && user.nombre}</div>
                    <div className="font-medium truncate">
                      {user && user.correo}
                    </div>
                  </div>
                  <div className="py-2">
                    <Link to="/home">
                      <div className="block px-4 py-2 text-lg text-white hover:bg-slate-800">
                        Volver
                      </div>
                    </Link>
                  </div>

                  <div className="py-2">
                    <Link to="/">
                      <div
                        onClick={logout}
                        className="block px-4 py-2 text-lg text-white hover:bg-slate-800"
                      >
                        Sign out
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              position: "relative",
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
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  window: PropTypes.func,
  setActiveTab: PropTypes.func.isRequired,
};

export default Sidebar;
