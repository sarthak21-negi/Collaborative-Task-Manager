export default function TaskCard({ task }) {
  return (
    <div className="task-card">
      <strong>{task.title}</strong>
      <p>{task.description}</p>
      <small>Status: {task.status}</small>
    </div>
  );
}
