import './BookList.css';

export default function BookList({ books, onDelete }) {
  return (
    <div className="book-grid">
      {books.map((book, index) => (
        <div 
          key={book.id} 
          className="book-card"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <h3>{book.title}</h3>
          <p className="book-author">Author: {book.author}</p>
          <p className="book-price">Price: ${book.price}</p>
          <p className="book-genre">Genre: {book.genre}</p>
          <button 
            className="delete-btn"
            onClick={() => onDelete(book.id)}
          >
            Delete Book
          </button>
        </div>
      ))}
    </div>
  );
}