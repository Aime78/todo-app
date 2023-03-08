import { FaRegTrashAlt } from 'react-icons/fa';
import { useState } from 'react';
interface TodoInterface {
  [key: string]: any;
}

const Todo = ({ todo, toggleComplete, deleteTodo }: TodoInterface) => {
  const [showDetails, setShowDetails] = useState(false);
  const completedLiStyle = ` bg-slate-400 p-4 my-2 capitalize`;
  const notCompletedLiStyle = `bg-slate-200 p-4 my-2 capitalize`;

  const completedTextStyle = `ml-2 cursor-pointer line-through font-semibold`;
  const notCompletedTextStyle = `ml-2 cursor-pointer font-semibold`;

  return (
    <li className={todo.completed ? completedLiStyle : notCompletedLiStyle}>
      <div className="flex justify-between">
        <div className="flex">
          <input className="cursor-pointer" onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? true : false} />
          <p onClick={() => toggleComplete(todo)} className={todo.completed ? completedTextStyle : notCompletedTextStyle}>
            {todo.title}
          </p>
        </div>
        <div>
          <button onClick={() => deleteTodo(todo.id)}>
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
      <div className="flex justify-between py-2">
        <div className="text-xs">
          <p>
            {todo.start} / {todo.end}
          </p>
        </div>
        <div className={`text-xs border p-2 ml-2  ${showDetails ? 'bg-red-700' : 'bg-purple-500'}  text-slate-100 cursor-pointer`} onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide details' : 'Show details'}
        </div>
      </div>
      {showDetails && (
        <div className="my-4 text-base font-light">
          <p>{todo.details}</p>
        </div>
      )}
    </li>
  );
};

export default Todo;
