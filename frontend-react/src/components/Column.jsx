import TaskCard from "./TaskCard";

export default function Column({ title, tasks }) {
  return (
    <div className="column">
      <h4>{title}</h4>
      {tasks.map((t, i) => (
        <TaskCard key={t.id} task={t} index={i} />
      ))}
    </div>
  );
}
