import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    fetch('http://localhost:8080/advertisement?sortedBy=title&sortOrder=desc')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Update the state with the fetched data
        setTodos(data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <div className="container mt-5">
      <h1>Marketplace</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Added</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.addedDate}</td>
              <td>
                <button type="button" className="btn btn-danger">
                  X
                </button>
                <button type="button" className="btn btn-warning">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
