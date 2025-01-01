import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Id, Task } from "../types";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
}

const TaskCard = ({ task, deleteTask }: Props) => {
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <div
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      className="bg-slate-200 p-2 h-[100px] min-h-[100px] items-center flex text-left rounded-lg hover:ring-2 hover:ring-inset hover:ring-rose-400 cursor-grab relative transition-all ease-in-out duration-150"
    >
      {task.content}
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
