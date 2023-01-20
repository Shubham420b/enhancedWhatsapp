import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../css/chat.css";
import MoodIcon from "@mui/icons-material/Mood";
import MicIcon from "@mui/icons-material/Mic";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import db from "../firebase";
import { useEffect, useState } from "react";
import { useStateValue } from "../context/stateContext";

const Chat = () => {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState();
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      const docRef = doc(db, "rooms", roomId);
      getDoc(docRef).then((doc) => {
        setRoomName(doc.data().name);
      });
      const colRef = collection(docRef, "messages");
      const q = query(colRef, orderBy("timeStamp"));
      onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input === "") {
      return alert("Please enter your message");
    }
    const docRef = doc(db, "rooms", roomId);
    const colRef = collection(docRef, "messages");
    addDoc(colRef, {
      name: user.displayName,
      message: input,
      timeStamp: serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/123.svg`} />
        <div className="chat_headerInfo">
          <h2>{roomName}</h2>
          <p>
          {messages.length?(new Date(messages[messages.length-1]?.timeStamp?.seconds * 1000).toLocaleTimeString()):''}
          </p>
        </div>
        <div className="chat_headerIcons">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((chat) => (
          <p
            className={`chat_message ${
              user.displayName === chat.name && "chat_receiver"
            }`}
            key={chat.id}
          >
            <span className="chat_name">{chat.name}</span>
            {chat.message}
            <span className="chat_time">
              {new Date(chat.timeStamp?.seconds * 1000).toLocaleTimeString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <IconButton>
          <MoodIcon />
        </IconButton>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={input}
            placeholder="Type your message"
            onChange={(e) => setInput(e.target.value)}
          />
          <input type="submit" />
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
