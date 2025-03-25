import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import Pagination from './components/Pagination';
import './App.css';

Modal.setAppElement('#root');

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Simulated Authentication
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = () => {
    const fakeUser = { email: 'user@demo.com', token: 'fake-token' };
    localStorage.setItem('user', JSON.stringify(fakeUser));
    setUser(fakeUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Task Operations
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filter/Sort Logic
  const filteredTasks = tasks
    .filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === 'all' || task.status === filterStatus)
    )
    .sort((a, b) => sortBy === 'newest' ? b.id - a.id : a.id - b.id);

  // Pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  if (!user) return (
    <div className="auth-container">
      <h2 style={{color:'black'}}>Login</h2>
      <button onClick={login}>Simulated Login</button>
    </div>
  );

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
        <button onClick={logout}>Logout</button>
      </header>

      <div className="controls">
        <input
          type="text"
          placeholder="Search tasks..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
        <button onClick={() => setIsModalOpen(true)}>+ Add Task</button>
      </div>

      <TaskList 
        tasks={currentTasks} 
        onDelete={deleteTask} 
      />

      <Pagination
        totalTasks={filteredTasks.length}
        tasksPerPage={tasksPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTask}
      />
    </div>
  );
}