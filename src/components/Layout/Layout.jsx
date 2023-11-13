import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import PathList from "../Shared/PathList";
import CRMAppBar from "../Shared/CRMAppBar";
import { useSelector } from "react-redux";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Layout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const {theme} = useSelector(state=> state.app)


  const handleDrawer = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <Box sx={{ display: "flex", background: `${theme == "DARK" && '#0a1929'}` }}>
      <CssBaseline />
      <CRMAppBar
        AppBar={AppBar}
        handleDrawer={handleDrawer}
        open={open}
      ></CRMAppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            display: "flex",
            justifyContent: "start",
            background: `${theme == "DARK"? "#0a1929": "#1976d2"}`,
            paddingLeft: "16px",
            color: "#f3f6f9",
          }}
        >
          <Typography
            sx={{
              ...(!open && { display: "none" }),
            }}
            variant="h6"
            noWrap
            component="div"
          >
            VIVIAN<span style={{fontSize: '36px'}}>S</span>tudios
            {/* VIVIAN <br /> <span style={{marginLeft: '12px'}}>Studios</span> */}
          </Typography>
        </DrawerHeader>
        <Divider />
        <PathList open={open}></PathList>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, minWidth: '90%' }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}


export default Layout;