export const connectWebSocket = (userId, onMessage) => {
  const ws = new WebSocket(`ws://localhost:8081/ws?userId=${userId}`);

  ws.onopen = () => console.log("✅ WS CONNECTED", userId);
  ws.onmessage = (event) => {
    console.log("📩 WS RAW:", event.data);
    onMessage(JSON.parse(event.data));
  };
  ws.onerror = (e) => console.error("❌ WS ERROR", e);
  ws.onclose = () => console.log("❌ WS CLOSED");

  return ws;
};



