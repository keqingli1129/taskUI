import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/tasks', {
        ...newTask,
        completed: false
      });
      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>

      <div>
        <h2 className="text-xl font-bold mb-4">Tasks</h2>
        {tasks.map((task) => (
          <div key={task.id} className="border p-4 mb-2 rounded">
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500">
              Status: {task.completed ? 'Completed' : 'Pending'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
