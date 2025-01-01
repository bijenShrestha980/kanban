import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Id, Task } from "../types";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const TaskCard = ({ task, deleteTask, updateTask }: Props) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [editContent, setEditContent] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editContent,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const toggleEditContent = () => {
    setEditContent((prev) => !prev);
    setMouseOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-slate-200 p-2 h-[100px] min-h-[100px] items-center flex text-left rounded-lg cursor-grab opacity-30 border-2 border-rose-500"
      />
    );
  }
  if (editContent) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-slate-200 p-2 h-[100px] min-h-[100px] items-center flex text-left rounded-lg hover:ring-2 hover:ring-inset hover:ring-rose-400 cursor-grab relative transition-all ease-in-out duration-150 task-scroll"
      >
        <textarea
          value={task.content}
          autoFocus
          placeholder="Enter task content"
          onBlur={toggleEditContent}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditContent();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
          onFocus={(e) => e.target.select()}
          className="font-semibold h-[90%] w-full resize-none border-none rounded bg-transparent focus:outline-none"
        ></textarea>
      </div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onClick={toggleEditContent}
      className="bg-slate-200 p-2 h-[100px] min-h-[100px] items-center flex text-left rounded-lg hover:ring-2 hover:ring-inset hover:ring-rose-400 cursor-grab relative transition-all ease-in-out duration-150"
    >
      <p className="font-semibold my-auto h-[90%] w-full overflow-y-auto overflow-x-hiddden whitespace-pre-wrap">
        {task.content}
      </p>
      {mouseOver && (
        <button
          onClick={() => deleteTask(task.id)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-100 p-2 rounded-xl opacity-60 hover:opacity-100 transition-all ease-in-out duration-150"
        >
          <Trash2 size={20} />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
