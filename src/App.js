import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import Todo from "./Components/Todo";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [expandedTodos, setExpandedTodos] = useState([]);

  useEffect(() => {
    getAllTodos();
  }, []);

  function getAllTodos() {
    fetch("http://localhost:3001/todos")
      .then(res => res.json())
      .then(datas => setTodos(datas));
  }

  const todoRemoveHandler = id => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    }).then(res => {
      if (res.status === 200) {
        swal({
          title: "Todo Removed Successfully ;))",
          icon: "success",
          buttons: "Hmmm, Ok",
        });
        getAllTodos();
      }
    });
  };

  const todoDoneHandler = todo => {
    const updatedTodo = { ...todo, isDone: !todo.isDone };
    fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    }).then(res => {
      if (res.status === 200) {
        swal({
          title: updatedTodo.isDone
            ? "Todo Done Successfully ;))"
            : "Todo Rescind",
          icon: "success",
          buttons: "Hmmm, Ok",
        });
        getAllTodos();
      }
    });
  };

  const createTodoHandler = event => {
    event.preventDefault();
    if (newTodoTitle.length < 2) {
      swal({
        title: "Title must be at least 2 characters!",
        icon: "warning",
        buttons: "Okay",
      });
      return;
    }
    if (newTodoTitle.length > 30) {
      swal({
        title: "Title must be less than 30 characters!",
        icon: "warning",
        buttons: "Okay",
      });
      return;
    }
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTodoTitle,
        isDone: false,
      }),
    }).then(res => {
      if (res.status === 201) {
        swal({
          title: "Todo Created Successfully ;))",
          icon: "success",
          buttons: "Hmmm, Ok",
        });
        setNewTodoTitle("");
        getAllTodos();
      }
    });
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.isDone;
    if (filter === "incomplete") return !todo.isDone;
    return true;
  });

  // expandedTodos برای کنترل وضعیت گسترش
  const toggleExpanded = id => {
    setExpandedTodos(prevState =>
      prevState.includes(id)
        ? prevState.filter(todoId => todoId !== id)
        : [...prevState, id]
    );
  };

  return (
    <>
      <header>
        <h1 className="title">Pedram Todolist</h1>
      </header>
      <form onSubmit={createTodoHandler}>
        <input
          type="text"
          className="todo-input"
          value={newTodoTitle}
          onChange={event => setNewTodoTitle(event.target.value)}
        />
        <button className="todo-button" type="submit">
          <i className="fas fa-plus-circle fa-lg"></i>
        </button>
        <div className="select">
          <select
            name="todos"
            className="filter-todo"
            value={filter}
            onChange={event => setFilter(event.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </form>

      <div className="todo-container">
        <ul className="todo-list">
          <Todo
            todos={filteredTodos}
            onRemove={todoRemoveHandler}
            onDo={todoDoneHandler}
            expandedTodos={expandedTodos}
            toggleExpanded={toggleExpanded}
          />
        </ul>
      </div>
    </>
  );
}
