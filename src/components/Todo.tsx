import { FaRegTrashAlt } from 'react-icons/fa';

interface TodoInterface {
  [key: string]: any;
}

const Todo = ({ todo, toggleComplete, deleteTodo }: TodoInterface) => {
  const completedLiStyle = `flex justify-between bg-slate-400 p-4 my-2 capitalize`;
  const notCompletedLiStyle = `flex justify-between bg-slate-200 p-4 my-2 capitalize`;

  const completedTextStyle = `ml-2 cursor-pointer line-through`;
  const notCompletedTextStyle = `ml-2 cursor-pointer`;

  return (
    <li className={todo.completed ? completedLiStyle : notCompletedLiStyle}>
      <div className="flex">
        <input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? true : false} />
        <p onClick={() => toggleComplete(todo)} className={todo.completed ? completedTextStyle : notCompletedTextStyle}>
          {todo.text}
        </p>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>
        <FaRegTrashAlt />
      </button>
    </li>
  );
};

export default Todo;
