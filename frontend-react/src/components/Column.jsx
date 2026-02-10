import { Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

export default function Column({ title, tasks }) {
  return (
    <div className="column">
      <h3>{title.replace("_", " ")}</h3>

      {tasks.map((task, index) => (
        <Draggable draggableId={String(task.id)} index={index} key={task.id}>
          {(p) => (
            <div
              ref={p.innerRef}
              {...p.draggableProps}
              {...p.dragHandleProps}
            >
              <TaskCard task={task} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
}

