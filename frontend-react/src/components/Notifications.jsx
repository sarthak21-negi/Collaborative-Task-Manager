import { useEffect, useState } from "react";

export default function Notifications() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081/ws");

    ws.onmessage = e => {
      setMessages(prev => [...prev, e.data]);
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h3>Live Notifications</h3>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}
