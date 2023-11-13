import React from 'react';
import { IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import Settings from './Settings';
import { useSelector } from 'react-redux';


const CRMAppBar = ({AppBar, handleDrawer, open}) => {
  const {theme} = useSelector(state=> state.app)
    return (
        <AppBar sx={{background: `${theme == "DARK" && "#0a1929"}`, color: '#f3f6f9'}} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: 5,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            sx={{
              ...(open && { display: "none" }),
            }}
            variant="h6"
            noWrap
            component="div"
          >
            VIVIAN<span style={{fontSize: '36px'}}>S</span>tudios
          </Typography>
         <Settings />
        </Toolbar>
      </AppBar>
    );
};

export default CRMAppBar;