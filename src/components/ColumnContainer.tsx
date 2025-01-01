import { useMemo, useState } from "react";
import { CirclePlus, Trash2 } from "lucide-react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column, Id, Task } from "../types";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumnTitle: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  tasks: Task[];
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}
const ColumnContainer = (props: Props) => {
  const {
    column,
    deleteColumn,
    updateColumnTitle,
    createTask,
    tasks,
    deleteTask,
    updateTask,
  } = props;
  const [editTitle, setEditTitle] = useState(false);
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editTitle,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-slate-100 opacity-40 border-2 border-rose-500 w-[350px] h-[500px] max-h-[500px] rounded-xl flex flex-col"
      />
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-slate-100 w-[350px] h-[500px] max-h-[500px] rounded-xl flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditTitle(true)}
        className="bg-slate-200 text-md h-[60px] cursor-grab rounded-xl rounded-b-lg p-3 border-slate-100 border-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-2 font-semibold">
          <div className="flex justify-center items-center bg-slate-100 px-2 py-1 text-sm rounded-md">
            0
          </div>
          {editTitle ? (
            <input
              autoFocus
              onBlur={() => setEditTitle(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setEditTitle(false);
                }
              }}
              value={column.title}
              onChange={(e) => updateColumnTitle(column.id, e.target.value)}
              className="bg-slate-300 focus:border-rose-500 border-rounded outline-none px-2"
            />
          ) : (
            column.title
          )}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="hover:bg-slate-100 p-2 rounded-xl transition-all ease-in-out duration-150"
        >
          <Trash2 size={20} />
        </button>
      </div>
      <div className="flex flex-col flex-grow gap-2 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      <button
        onClick={() => createTask(column.id)}
        className="flex gap-2 items-center border-slate-100 border-2 rounded-xl m-2 p-2 hover:border-slate-200 hover:bg-slate-200 hover:text-rose-500 active:bg-slate-300 active:border-slate-300 text-sm font-semibold transition-all ease-in-out duration-150"
      >
        <CirclePlus size={20} />
        Add Task
      </button>
    </div>
  );
};

export default ColumnContainer;
