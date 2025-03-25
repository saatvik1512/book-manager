import Modal from 'react-modal';
import { useState } from 'react';

export default function AddBookModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    genre: 'Fiction'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      price: Number(formData.price)
    });
    onClose();
    setFormData({ title: '', author: '', price: '', genre: 'Fiction' });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={{background:'white', color:'black'}}
          required
          placeholder="Book Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
        <input
          style={{background:'white', color:'black'}}
          required
          placeholder="Author"
          value={formData.author}
          onChange={(e) => setFormData({...formData, author: e.target.value})}
        />
        <input
          style={{background:'white', color:'black'}}
          required
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
        />
        <select
          style={{background:'white', color:'black'}}
          value={formData.genre}
          onChange={(e) => setFormData({...formData, genre: e.target.value})}
        >
          <option>Fiction</option>
          <option>Non-Fiction</option>
          <option>Science Fiction</option>
          <option>Mystery</option>
        </select>
        <div className="modal-actions">
          <button type="submit">Add Book</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}