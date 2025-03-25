export default function TaskList({ tasks, onDelete }) {
    return (
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <h3 style={{color:'black'}}>{task.title}</h3>
            <p style={{color:'black'}}>Status: {task.status}</p>
            <div className="task-actions">
              <button onClick={() => onDelete(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    );
  }