import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import Column from "../components/Column";

export default function Board() {
  const [tasks, setTasks] = useState({
    TODO: [{ id: "1", title: "Sample Task" }],
    IN_PROGRESS: [],
    DONE: []
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCol = tasks[source.droppableId];
    const destCol = tasks[destination.droppableId];

    const [moved] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, moved);

    setTasks({ ...tasks });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {Object.keys(tasks).map(col => (
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
