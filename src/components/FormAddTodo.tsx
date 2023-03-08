import { InputsInterface } from '../types/TodoInterface';

type FormAddTodoProps = {
  inputs: InputsInterface;
  close: () => void;
  setInputs: React.Dispatch<React.SetStateAction<InputsInterface>>;
  createTodo: (e: React.FormEvent<HTMLFormElement>) => void;
};
const FormAddTodo = ({ inputs, close, setInputs, createTodo }: FormAddTodoProps) => {
  return (
    <div>
      <form className="" onSubmit={createTodo}>
        <input
          value={inputs.title}
          onChange={(e) =>
            setInputs((prevInputs) => ({
              ...prevInputs,
              title: e.target.value,
            }))
          }
          className="border p-2 w-full text-xl"
          type="text"
          placeholder="Title: Laundry"
        />
        <textarea
          value={inputs.details}
          onChange={(e) =>
            setInputs((prevInputs) => ({
              ...prevInputs,
              details: e.target.value,
            }))
          }
          className="border p-2 w-full text-xl"
          placeholder="Details: e.g. fold laundry at 4pm"
        />
        <label htmlFor="start" className="font-medium text-xl pr-2 ">
          Start:
        </label>
        <input
          value={inputs.start}
          onChange={(e) =>
            setInputs((prevInputs) => ({
              ...prevInputs,
              start: e.target.value,
            }))
          }
          id="start"
          type="date"
          className="appearance-none border-2 border-gray-300 rounded-md py-2 px-3 placeholder-gray-400 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        />
        <label htmlFor="end" className="font-medium text-xl pl-6 pr-2">
          End:
        </label>
        <input
          value={inputs.end}
          onChange={(e) =>
            setInputs((prevInputs) => ({
              ...prevInputs,
              end: e.target.value,
            }))
          }
          id="end"
          type="date"
          className="appearance-none border-2 border-gray-300 rounded-md py-2 px-3 placeholder-gray-400 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        />
        <div className="my-4">
          <button className="border py-2 px-4 ml-2 bg-purple-500 text-slate-100">Add</button>
          <button className="border p-2 ml-2 bg-red-700 text-slate-100" onClick={close}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddTodo;
