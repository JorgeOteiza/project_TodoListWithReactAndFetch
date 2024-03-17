import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../../styles/style.css";

const Home = () => {
  const [todoListData, setTodoListData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const printList = () => {
    return todoListData.length > 0 ? (
      todoListData.map((todoText, index) => (
        <article key={index}>
          <p
            onMouseEnter={(e) =>
              (e.target.querySelector("button").style.display = "inline-block")
            }
            onMouseLeave={(e) =>
              (e.target.querySelector("button").style.display = "none")
            }
          >
            <span>{todoText}</span>{" "}
            <button onClick={() => deleteTodoItem(todoText)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </p>
        </article>
      ))
    ) : (
      <p
        style={{
          color: "red",
          fontStyle: "italic",
          fontSize: "18px",
          textAlign: "center",
        }}
      >
        La lista está vacía
      </p>
    );
  };

  const addTodoItem = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;
    setTodoListData([...todoListData, inputValue]);
    setInputValue("");
  };

  const deleteTodoItem = (todoItemToDelete) => {
    setTodoListData(todoListData.filter((value) => value !== todoItemToDelete));
  };

  return (
    <div>
      <h1>LISTA</h1>
      <form onSubmit={addTodoItem}>
        <input
          name="todoInput"
          id="todoInput"
          placeholder="Agregar nuevo"
          autoFocus
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
      <section id="todoList">{printList()}</section>
    </div>
  );
};

export default Home;
