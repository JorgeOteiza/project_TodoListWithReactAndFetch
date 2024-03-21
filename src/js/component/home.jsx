import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../../styles/index.css";

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

  const updateTodoList = (todos) => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/alesanchezr", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data); // Acá puedo agregar más lógica si es necesario
      })
      .catch((error) => {
        console.log(error); // Manejo de errores
      });
  };

  const handleSaveList = () => {
    // Llama a la función de actualización con la lista de tareas pendientes
    updateTodoList(todoListData);
  };

  return (
    <div>
      <h1>LISTA DE TAREAS</h1>
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
      <button onClick={handleSaveList}>Guardar Lista</button>{" "}
      {/* Agregar botón para guardar la lista */}
    </div>
  );
};

export default Home;
