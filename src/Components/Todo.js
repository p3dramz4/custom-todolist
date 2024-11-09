import React, { useState } from "react";

export default function Todo({ todos, onRemove, onDo }) {
  const [expandedTodos, setExpandedTodos] = useState([]);

// تابع برای سه نقطه 
  const toggleExpanded = id => {
    if (expandedTodos.includes(id)) {
      setExpandedTodos(expandedTodos.filter(todoId => todoId !== id));
    } else {
      setExpandedTodos([...expandedTodos, id]);
    }
  };

  return (
    <>
      {todos.map(todo => {
        const isExpanded = expandedTodos.includes(todo.id);

        return (
          <div
            key={todo.id}
            className={`todo ${todo.isDone ? "completed" : ""}`}>
            <li
              className={`todo-item ${isExpanded ? "expanded" : ""}`}
              onClick={() => toggleExpanded(todo.id)}>
              {todo.title}
            </li>
            <button className="complete-btn" onClick={() => onDo(todo)}>
              <i className="fas fa-check-circle"></i>
            </button>
            <button className="trash-btn" onClick={() => onRemove(todo.id)}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        );
      })}
    </>
  );
}
