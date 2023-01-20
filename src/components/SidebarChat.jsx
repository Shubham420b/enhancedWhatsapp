import { Avatar } from "@mui/material";
import {
  addDoc,
  collection,
  query,
  doc,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/sidebar.css";
import db from "../firebase";

const SidebarChat = ({ addNewChat, id, name }) => {
  const [seed, setSeed] = useState("");
  const [lastMessage, setLastMessage] = useState([]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
    if (id) {
      const docRef = doc(db, "rooms", id);
      const colRef = collection(docRef, "messages");
      const q = query(colRef, orderBy("timeStamp", "desc"));
      onSnapshot(q, (snapshot) => {
        setLastMessage(snapshot.docs.map((doc) => doc.data()));
        let temp = [];
        snapshot.docs.forEach((doc) => {
          temp.push(...doc.data())
        })
        setLastMessage(temp)
      });
    }
    console.log(id)
  }, []);
  const createChat = () => {
    const room = prompt("Please enter room name");
    if (room) {
      const colRef = collection(db, "rooms");
      addDoc(colRef, {
        name: room,
      }).then(() => {
        console.log("room added");
      });
    }
  };

  return addNewChat ? (
    <div className="sidebar_chat" onClick={createChat}>
      <h2>Add New Chat</h2>
    </div>
  ) : (
    <Link to={`/room/${id}`} className="chat_link">
      <div className="sidebar_chat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebar_chatContent">
          <h2>{name}</h2>
          {/* <p>{lastMessage[0]?.message}</p> */}
          <p>Last Message</p>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
