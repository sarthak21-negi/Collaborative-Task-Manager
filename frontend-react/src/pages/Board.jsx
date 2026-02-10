import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import api from "../services/api";
import Column from "../components/Column";

export default function Board() {
  const [tasks, setTasks] = useState({
    TODO: [],
    IN_PROGRESS: [],
    DONE: []
  });

  // 🔥 Load tasks (empty now because backend has no GET endpoint yet)
  useEffect(() => {
    // Future ready:
    // api.get("/tasks").then(res => organizeTasks(res.data))
  }, []);

  const organizeTasks = (list) => {
    const map = { TODO: [], IN_PROGRESS: [], DONE: [] };
    list.forEach(t => map[t.status].push(t));
    setTasks(map);
  };

  // 🔥 REAL backend-wired movement
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId) return;

    const newStatus = destination.droppableId;
    const taskId = draggableId;

    try {
      // ✅ Backend update
      await api.put(`/tasks/${taskId}/status?status=${newStatus}`);

      // ✅ Optimistic UI
      const sourceCol = [...tasks[source.droppableId]];
      const destCol = [...tasks[destination.droppableId]];

      const [moved] = sourceCol.splice(source.index, 1);
      moved.status = newStatus;
      destCol.splice(destination.index, 0, moved);

      setTasks({
        ...tasks,
        [source.droppableId]: sourceCol,
        [destination.droppableId]: destCol
      });

    } catch (err) {
      console.error("Task move failed:", err);
      alert("Failed to move task");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {["TODO", "IN_PROGRESS", "DONE"].map(col => (
          <Droppable droppableId={col} key={col}>
            {(p) => (
              <div ref={p.innerRef} {...p.droppableProps}>
                <Column title={col} tasks={tasks[col]} />
                {p.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
