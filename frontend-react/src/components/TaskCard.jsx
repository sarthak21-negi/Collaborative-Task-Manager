import api from "../services/api";

export default function TaskCard({ task, onDelete }) {
  const handleDelete = async () => {
    if (!window.confirm(`Delete "${task.title}"?`)) return;

    try {
      await api.delete(`/tasks/${task.id}`);
      onDelete(task.id); // ✅ Remove from UI immediately
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="task-card">
      <strong>{task.title}</strong>
      <p>{task.description}</p>
      <small>Status: {task.status}</small>
      <button
        onClick={handleDelete}
        style={{
          marginTop: "8px",
          background: "#ff4d4d",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "4px 10px",
          cursor: "pointer",
          float: "right"
        }}
      >
        🗑️ Delete
      </button>
    </div>
  );
}