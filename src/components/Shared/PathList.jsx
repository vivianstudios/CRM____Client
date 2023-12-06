import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BallotIcon from "@mui/icons-material/Ballot";
import WorkHistoryRoundedIcon from "@mui/icons-material/WorkHistoryRounded";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EngineeringIcon from "@mui/icons-material/Engineering";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useSelector } from "react-redux";

const PathList = ({ open }) => {
  const { currentUser } = useSelector((state) => state.users);
  const { theme } = useSelector((state) => state.app);
  const {pathname}= useLocation()

  const pathList = [
    {
      icon: <DashboardIcon />,
      text: "Dashboard",
      path: "/dashboard",
      user: true,
      admin: true,
    },
    {
      icon: <PeopleAltIcon />,
      text: "Users",
      path: "/users",
      user: false,
      admin: true,
    },
   {
    icon: <EditNoteIcon />,
    text: 'Blogs',
    path: '/blog',
    user: false , 
    admin:true
   },
    {
      icon: <BallotIcon />,
      text: "All Leads",
      path: "/allLeads",
      user: true,
      admin: true,
    },
    {
      icon: <WorkHistoryRoundedIcon />,
      text: "Fresh Leads",
      path: "/freshLeads",
      user: true,
      admin: true,
    },
    {
      icon: <BookmarkIcon />,
      text: "FollowUp Leads",
      path: `/followUp/${currentUser?.id}`,
      user: true,
      admin: false,
    },
    {
      icon: <AssignmentIcon />,
      text: "Assign Leads",
      path: `/assignLeads/${currentUser?.id}`,
      user: true,
      admin: false,
    },
    {
      icon: <FavoriteIcon />,
      text: "Favorite Leads",
      path: `/favLeads/${currentUser?.id}`,
      user: true,
      admin: false,
    },
    // {
    //   icon: <EngineeringIcon />,
    //   text: "Parformenc",
    //   path: "/parformenc",
    //   user: true,
    //   admin: false,
    // },
  ];


  const activeStyle = (path) => {
    const style = {
      
    }

    if(path == pathname){
      if(theme == "DARK"){
        style.background = '#000';
        style.color = '#fff';
      }else{
        style.background = '#ddd';
      }
    }
    return style;
  }

  return (
    <Box
      sx={{
        background: `${theme == "DARK" && "#0a1929"}`,
        color: `${theme == "DARK" && "#f3f6f9"}`,
        height: "100%",
      }}
    >
      <List>
        {pathList.map((link, index) => {
          if (currentUser.role == "ADMIN") {
            return (
              link.admin && (
                <ListItem key={index} disablePadding sx={{display: "block"}}>
                 <span style={activeStyle(link.path)} id="crm-list-item">
                 <NavLink  to={link.path}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                          color: theme === "DARK" ? "#f3f6f9" : "#0a1929",
                        }}
                      >
                        {link.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={link.text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </NavLink>
                 </span>
                </ListItem>
              )
            );
          } else {
            return (
              link.user && (
                <ListItem key={index} disablePadding sx={{ display: "block" }}>
                  <NavLink to={link.path}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                          color: theme === "DARK" ? "#fff" : "#111",
                        }}
                      >
                        {link.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={link.text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              )
            );
          }
        })}
      </List>
      <Divider />
      <List>
        {currentUser?.role == 'ADMIN' && <ListItem disablePadding sx={{ display: "block" }}>
          <NavLink to={"/trashLeads"}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: theme === "DARK" ? "#fff" : "#111",
                }}
              >
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Trash Leads"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </NavLink>
        </ListItem>}
        <ListItem disablePadding sx={{ display: "block" }}>
          <NavLink to={"/profile"}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: theme === "DARK" ? "#fff" : "#111",
                }}
              >
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Profile"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </NavLink>
        </ListItem>
      </List>
    </Box>
  );
};

export default PathList;
