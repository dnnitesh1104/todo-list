
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('todo-tasks')) || [];
    } catch {
      return [];
    }
  });

  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();

    if (task.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask('');
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  const filteredTasks = tasks.filter((item) => {
    if (filter === 'Active') return !item.completed;
    if (filter === 'Completed') return item.completed;
    return true;
  });

  const completedCount = tasks.filter(
    (item) => item.completed
  ).length;

  return (
    <main className="app">
      <section className="todo-card">
        <header className="header">
          <p className="eyebrow">YOUR PERSONAL PLANNER</p>
          <h1>My Todo List</h1>
          <p className="subtitle">
            Small steps make big achievements.
          </p>
        </header>

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="What do you need to do?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            aria-label="New task"
          />
          <button type="submit">+ Add</button>
        </form>

        <div className="summary">
          <span>{tasks.length} total tasks</span>
          <span>{completedCount} completed</span>
        </div>

        <nav className="filters" aria-label="Filter tasks">
          {['All', 'Active', 'Completed'].map((name) => (
            <button
              key={name}
              type="button"
              className={filter === name ? 'filter active' : 'filter'}
              onClick={() => setFilter(name)}
            >
              {name}
            </button>
          ))}
        </nav>

        <ul className="task-list">
          {filteredTasks.map((item) => (
            <li
              key={item.id}
              className={item.completed ? 'task done' : 'task'}
            >
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item.id)}
                />
                <span>{item.text}</span>
              </label>

              <button
                type="button"
                className="delete-button"
                onClick={() => deleteTask(item.id)}
                aria-label={`Delete ${item.text}`}
                title="Delete task"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {filteredTasks.length === 0 && (
          <div className="empty">
            <p>{tasks.length === 0
              ? '✨ Your list is ready!'
              : 'No tasks in this filter.'}</p>
            <span>Add a task to get started.</span>
          </div>
        )}

        <footer>
          Built with React · Stay focused, one task at a time.
        </footer>
      </section>
    </main>
  );
}

export default App;
