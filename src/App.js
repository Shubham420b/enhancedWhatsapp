import React, { useEffect } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { useStateValue } from "./context/stateContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    });
  }, []);
  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="App">
          <div className="app_body">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/room/:roomId" element={<Chat />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
