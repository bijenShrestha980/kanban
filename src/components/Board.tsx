import { Plus } from "lucide-react";
import { useState } from "react";
import { Column } from "../types";

const Board = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  const generateId = () => {
    return Math.floor(Math.random() * 1000000);
  };
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((column) => (
            <div
              key={column.id}
              className="w-[300px] h-[500px] bg-mianBackground rounded-lg p-4"
            >
              <h1 className="text-2xl font-bold">{column.title}</h1>
            </div>
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
