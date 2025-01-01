import { Plus } from "lucide-react";
import { useState } from "react";
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";

const Board = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  const deleteColumn = (id: Id) => {
    const newColumns = columns.filter((column) => column.id !== id);
    setColumns(newColumns);
  };

  const generateId = () => {
    return Math.floor(Math.random() * 1000000);
  };
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((column) => (
            <ColumnContainer
              key={column.id}
              column={column}
              deleteColumn={deleteColumn}
            />
          ))}
        </div>
        <button
          onClick={() => createNewColumn()}
          className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mianBackground border-2 border-columnBackground p-4 ring-rose-500 hover:ring-2 flex gap-2"
        >
          <Plus />
          Add Column
        </button>
      </div>
    </div>
  );
};

export default Board;