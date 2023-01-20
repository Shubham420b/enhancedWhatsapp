import React, { useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import "../css/sidebar.css";
import SidebarChat from "./SidebarChat";
import db, { auth } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useStateValue } from "../context/stateContext";
import { signOut } from "firebase/auth";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  const colRef = collection(db, "rooms");
  onSnapshot(colRef, (snapshot) => {
    setRooms(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
    );
  });
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar
          src={user.photoURL}
          onClick={(e) => {
            signOut(auth)
              .then(() => {
                // Sign-out successful
              })
              .catch((err) => {
                console.log(err.message);
              });
          }}
        />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input type="text" placeholder="Search or start a new chat" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => {
          return (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
