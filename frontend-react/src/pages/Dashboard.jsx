import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { connectWebSocket } from "../services/ws";
import Board from "./Board";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
  if (!user?.id) return;

  const ws = connectWebSocket(user.id, (event) => {
    console.log("🎯 DASHBOARD EVENT:", event);

    const text = `🆕 ${event.title} | ${event.status} | Task#${event.taskId}`;

    setNotifications(n => [text, ...n]);
  });

  return () => ws?.close();
}, [user]);



  return (
    <>
      <button onClick={logout}>Logout</button>
      <h3>Notifications</h3>
      {notifications.map((n, i) => <div key={i}>{n}</div>)}
      <Board />
    </>
  );
}
