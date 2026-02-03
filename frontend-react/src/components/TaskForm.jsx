import { useState } from "react";
import { createTask } from "../api";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  async function submit(e) {
    e.preventDefault();
    await createTask({ title, assignedTo });
    setTitle("");
    setAssignedTo("");
  }

  return (
    <form onSubmit={submit}>
      <h3>Create Task</h3>

      <input
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        placeholder="Assign to user"
        value={assignedTo}
        onChange={e => setAssignedTo(e.target.value)}
      />

      <button>Create</button>
    </form>
  );
}
