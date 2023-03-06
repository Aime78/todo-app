import { useState, useEffect, FormEvent } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Todo } from './components';
import { db } from './firebase/config';
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import TodoInterface from './types/TodoInterface';

function App() {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [input, setInput] = useState('');

  // Create
  const createTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === '') {
      alert('Please enter a valid todo');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });
    setInput('');
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
    <div className="py-16 h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]">
      <div className="bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 p-2">Todo App</h1>
        <form onSubmit={createTodo} className="flex justify-between">
          <input value={input} onChange={(e) => setInput(e.target.value)} className="border p-2 w-full text-xl" type="text" placeholder="Add todo" />
          <button className="border p-4 ml-2 bg-purple-500 text-slate-100">
            <AiOutlinePlus />
          </button>
        </form>
        <ul>
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
          ))}
        </ul>
        {todos.length > 0 && <p className="text-center p-2">{`You have ${todos.length} todos`}</p>}
      </div>
    </div>
  );
}

export default App;
