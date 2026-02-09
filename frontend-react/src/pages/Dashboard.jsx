import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { connectWebSocket } from "../services/ws";
import Board from "./Board";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const ws = connectWebSocket(user.id, (msg) => {
      setNotifications(n => [msg.message, ...n]);
    });
    return () => ws.close();
  }, []);

  return (
    <>
      <button onClick={logout}>Logout</button>
      <h3>Notifications</h3>
      {notifications.map((n, i) => <div key={i}>{n}</div>)}
      <Board />
    </>
  );
}
