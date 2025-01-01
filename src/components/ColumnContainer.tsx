import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column, Id } from "../types";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumnTitle: (id: Id, title: string) => void;
}
const ColumnContainer = (props: Props) => {
  const { column, deleteColumn, updateColumnTitle } = props;
  const [editTitle, setEditTitle] = useState(false);

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
        className="bg-slate-100 opacity-40 border-2 border-rose-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
      />
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-slate-100 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditTitle(true)}
        className="bg-slate-200 text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 border-slate-100 border-4 flex items-center justify-between"
      >
        <div className="flex gap-2">
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
          className="hover:bg-slate-100 px-1 py-2 rounded-md"
        >
          <Trash2 size={20} strokeWidth={1} />
        </button>
      </div>
      <div className="flex flex-grow">Content</div>
      <div>Footer</div>
    </div>
  );
};

export default ColumnContainer;
