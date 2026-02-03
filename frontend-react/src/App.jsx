import TaskForm from "./components/TaskForm";
import Notifications from "./components/Notifications";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Task Management</h2>
      <TaskForm />
      <Notifications />
    </div>
  );
}

