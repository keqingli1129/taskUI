import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/tasks', {
        ...newTask,
        completed: false
      });
      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdate = async (task) => {
    try {
      await axios.put(`/api/tasks/${task.id}`, task);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/tasks/${id}`);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const toggleComplete = async (task) => {
    try {
      await axios.put(`/api/tasks/${task.id}`, {
        ...task,
        completed: !task.completed
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-dark-800 text-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-100">Task Manager</h1>
      
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="bg-dark-700 border-dark-600 text-gray-100 border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          </div>
          <div className="mb-4">
          <textarea
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="bg-dark-700 border-dark-600 text-gray-100 border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          </div>
          <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add Task
          </button>
        </form>

      <div>
        <h2 className="text-xl font-bold mb-4">Tasks</h2>
        {tasks.map((task) => (
          <div key={task.id} className="bg-dark-700 border border-dark-600 p-4 mb-2 rounded-lg">
            {editingTask?.id === task.id ? (
              <div>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="bg-dark-600 border-dark-500 text-gray-100 border p-2 rounded w-full mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  className="bg-dark-600 border-dark-500 text-gray-100 border p-2 rounded w-full mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(editingTask)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    className="bg-dark-500 text-white px-3 py-1 rounded hover:bg-dark-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                    className="h-4 w-4 rounded border-dark-400 bg-dark-600 checked:bg-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-400">
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                  <button
                    onClick={() => setEditingTask(task)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors ml-auto"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
