import { Trash2 } from "lucide-react";
import { Column, Id } from "../types";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}
const ColumnContainer = (props: Props) => {
  const { column, deleteColumn } = props;
  return (
    <div className="bg-slate-100 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      <div className="bg-slate-200 text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 border-slate-100 border-4 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-slate-100 px-2 py-1 text-sm rounded-md">
            0
          </div>
          {column.title}
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