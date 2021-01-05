import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";

// import components:
import Header from "./components/Header";
import Footer from "./components/Footer";

// icons import:
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faListAlt } from "@fortawesome/free-solid-svg-icons";
import { faListAlt as farListAlt } from "@fortawesome/free-regular-svg-icons";
library.add(faTrash, faListAlt, farListAlt);

function App() {
  const list = JSON.parse(localStorage.getItem("list")) || [
    { title: "Pay bills", isDone: false },
    { title: "Make a to do list", isDone: true },
  ];

  const [tasks, setTasks] = useState(list);
  const [newTaskInput, setNewTaskInput] = useState("");

  const updateTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("list", JSON.stringify(newTasks));
  };

  return (
    <div>
      <Header />
      <form
        onSubmit={(event) => {
          event.preventDefault();

          // Add a new task
          const newTasks = [...tasks];
          newTasks.push({ title: newTaskInput, isDone: false });

          updateTasks(newTasks);

          // clean input
          setNewTaskInput("");
        }}
      >
        <input
          className="add-task"
          type="text"
          placeholder="new task"
          value={newTaskInput}
          onChange={(event) => {
            const value = event.target.value;
            setNewTaskInput(value);
          }}
        />
        <button className="button-add" type="submit">
          Add Task
        </button>
      </form>

      <div className="tasks">
        {tasks.map((task, index) => {
          return (
            <div key={index} className="task">
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={() => {
                  const newTasks = [...tasks];
                  // isDone est égal à l'inverse de lui même
                  newTasks[index].isDone = !newTasks[index].isDone;

                  updateTasks(newTasks);
                }}
              />
              <span className={task.isDone ? "checked" : ""}>{task.title}</span>

              <button
                className="delete-button"
                onClick={() => {
                  const newTasks = [...tasks];
                  // on retire un élement à partir de index
                  newTasks.splice(index, 1);
                  updateTasks(newTasks);
                }}
              >
                <FontAwesomeIcon
                  className="trash-icon"
                  icon={["fa", "trash"]}
                />
              </button>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
