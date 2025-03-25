import Modal from 'react-modal';
import { useState } from 'react';

export default function AddTaskModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('pending');

  const handleSubmit = () => {
    if (!title) return;
    onAdd({ title, status, date: new Date().toISOString() });
    setTitle('');
    setStatus('pending');
    onClose();
  };

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    className="modal"
    overlayClassName="overlay"
    >
    <div className="modal-content">
        <h2>Add New Task</h2>
        <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        </select>
        <div className="modal-actions">
        <button onClick={handleSubmit}>Add Task</button>
        <button onClick={onClose}>Cancel</button>
        </div>
    </div>
    </Modal>
  );
}