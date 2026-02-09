export const connectWebSocket = (userId, onMessage) => {
  const ws = new WebSocket(`ws://localhost:8081/ws?userId=${userId}`);

  ws.onmessage = (event) => {
    onMessage(JSON.parse(event.data));
  };

  return ws;
};
