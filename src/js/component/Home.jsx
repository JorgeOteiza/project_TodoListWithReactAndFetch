import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../../styles/index.css";
import { useFetch } from "../useFetch";

export const Home = () => {
  const [todoListData, setTodoListData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/gogi")
      .then((res) => res.json())
      .then(setTodoListData);
  }, []);

  const printList = () => {
    return todoListData.length > 0 ? (
      todoListData.map(({ label: todoText, done }, index) => (
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
  const updateTodoList = (todos) => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/gogi", {
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

  const addTodoItem = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;
    const newTodoItem = {
      label: inputValue,
      done: false,
    };
    setTodoListData([...todoListData, newTodoItem]);

    fetch("https://playground.4geeks.com/apis/fake/todos/user/gogi", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...todoListData, newTodoItem]),
    }).then((res) => {
      console.log(res.ok);
    });

    setInputValue("");
  };

  const deleteTodoItem = (todoItemToDelete) => {
    const resultFilter = todoListData.filter(
      ({ label: value }) => value !== todoItemToDelete
    );
    setTodoListData(resultFilter);

    updateTodoList(resultFilter);
  };

  const handleSaveList = () => {
    // Llama a la función de actualización con la lista de tareas pendientes
    updateTodoList(todoListData);
  };

  return (
    <div>
      <h1>TODOLIST</h1>
      <form onSubmit={addTodoItem}>
        <input
          name="todoInput"
          id="todoInput"
          placeholder="Agregar tarea"
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
