import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const API_URL = 'http://(localhost):5001/api/tasks';
// const API_URL = 'http://localhost:5001/api/tasks';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const response = await axios.post(API_URL, taskData);
      setTasks([response.data, ...tasks]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, taskData);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleTaskStatus = async (task) => {
    try {
      const response = await axios.put(`${API_URL}/${task._id}`, { completed: !task.completed });
      setTasks(tasks.map(t => t._id === task._id ? response.data : t));
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    if (statusFilter === 'Active') return matchesSearch && !task.completed;
    if (statusFilter === 'Completed') return matchesSearch && task.completed;
    return matchesSearch;
  });

  return (
    <div className="app-container">
      <header>
        <h1>Task Master</h1>
        <p>Organize your work with elegance</p>
      </header>

      <main>
        <TaskForm 
          onSubmit={editingTask ? (data) => updateTask(editingTask._id, data) : addTask} 
          initialData={editingTask}
          onCancel={editingTask ? () => setEditingTask(null) : null}
        />
        
        <div className="filters-container">
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {loading ? (
          <div className="empty-state">Loading tasks...</div>
        ) : (
          <TaskList 
            tasks={filteredTasks} 
            onDelete={deleteTask} 
            onToggle={toggleTaskStatus}
            onEdit={setEditingTask}
          />
        )}
      </main>
    </div>
  );
}

export default TasksPage;
