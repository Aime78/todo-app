import './globals.css';
import { useState, useEffect, FormEvent } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FormAddTodo, Todo } from './components';
import { db } from './firebase/config';
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { TodoInterface, InputsInterface } from './types/TodoInterface';

const todoInputs: InputsInterface = {
  title: '',
  details: '',
  start: '',
  end: '',
};

function App() {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [inputs, setInputs] = useState(todoInputs);

  const open = () => setOpenForm(true);
  const close = () => setOpenForm(false);

  // Create
  const createTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputs);
    const invalidTodo = inputs.title === '' || inputs.details === '' || inputs.start === '' || inputs.end === '';
    if (invalidTodo) {
      alert('Please enter all the informations');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      ...inputs,
      completed: false,
    });
    setInputs(todoInputs);
    close();
  };

  // Read
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr: TodoInterface[] = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Update
  const toggleComplete = async (todo: TodoInterface) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete
  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div className="py-20">
      <div className="bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 p-2">Todo App</h1>
        {openForm ? (
          <FormAddTodo close={close} inputs={inputs} setInputs={setInputs} createTodo={createTodo} />
        ) : (
          <div className="flex cursor-pointer" onClick={open}>
            <h3 className="text-xl font-bold">Add todo</h3>

            <button className="border p-2 ml-2 bg-purple-500 text-slate-100">
              <AiOutlinePlus />
            </button>
          </div>
        )}

        <ul>
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
          ))}
        </ul>
        {/* {todos.length > 0 && <p className="text-center p-2">{`You have ${todos.length} todos`}</p>} */}
      </div>
    </div>
  );
}

export default App;
