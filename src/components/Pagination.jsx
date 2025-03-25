export default function Pagination({ totalTasks, tasksPerPage, currentPage, onPageChange }) {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalTasks / tasksPerPage);
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
    );
  }