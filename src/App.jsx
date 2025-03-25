import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import BookList from './components/BookList';
import AddBookModal from './components/AddBookModal';
import Pagination from './components/Pagination';
import './App.css';

Modal.setAppElement('#root');

export default function App() {
  const [user, setUser] = useState(null);
  // const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const booksPerPage = 4;

  const [books, setBooks] = useState(() => {
    // Load from localStorage on initial render
    const savedBooks = localStorage.getItem('bookStoreBooks');
    return savedBooks ? JSON.parse(savedBooks) : [
      { id: 1, title: 'Sample Book 1', author: 'Author 1', price: 19.99, genre: 'Fiction' },
      { id: 2, title: 'Sample Book 2', author: 'Author 2', price: 29.99, genre: 'Non-Fiction' }
    ];
  });

  // Simulated Authentication
  useEffect(() => {
    localStorage.setItem('bookStoreBooks', JSON.stringify(books));
  }, [books]);

  const login = () => {
    const fakeUser = { email: 'admin@bookstore.com' };
    localStorage.setItem('user', JSON.stringify(fakeUser));
    setUser(fakeUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Book Operations
  const addBook = (book) => {
    setBooks([...books, { ...book, id: Date.now() }]);
  };

  const deleteBook = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  // Filtering and Pagination
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  if (!user) return (
    <div className="auth-screen">
      <h2 style={{color: 'black',}}>Book Store Login</h2>
      <button onClick={login}>Click to Enter</button>
    </div>
  );

  return (
    <div className="app">
      <header>
        <h1>Book Store</h1>
        <div className="controls">
          <input
            style={{background:'white', color:'black'}}
            type="text"
            placeholder="Search books..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setIsModalOpen(true)}>Add Book</button>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <BookList books={currentBooks} onDelete={deleteBook}/>
      
      <Pagination
        totalItems={filteredBooks.length}
        itemsPerPage={booksPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addBook}
      />
    </div>
  );
}