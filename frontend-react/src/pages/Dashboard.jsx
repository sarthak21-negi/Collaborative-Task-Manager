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

      let text;
  if (event.eventType === "CREATED") {
    text = `🆕 Created: "${event.title}" | ${event.status} | Task#${event.taskId}`;
  } else if (event.eventType === "DELETED") {
    text = `🗑️ Deleted: "${event.title}" | Task#${event.taskId}`;
  } else if (event.eventType === "MOVED") {
    text = `🔀 Moved: "${event.title}" → ${event.status} | Task#${event.taskId}`;
  } else {
    text = `📌 ${event.title} | ${event.status} | Task#${event.taskId}`;
  }
  
      setNotifications(n => [text, ...n]);

      // ✅ Dispatch custom event for Board to catch
      if (event.eventType === "CREATED") {
        window.dispatchEvent(new CustomEvent("TASK_CREATED", { 
          detail: {
            id: event.taskId,
            title: event.title,
            description: event.description || "",
            status: event.status
          }
        }));
      }

      if (event.eventType === "DELETED") {
        window.dispatchEvent(new CustomEvent("TASK_DELETED", {
          detail: { taskId: event.taskId }
        }));
      }
      
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
