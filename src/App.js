import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";

// import components:
import Header from "./components/Header";
import Footer from "./components/Footer";

// import icônes:
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faListAlt } from "@fortawesome/free-solid-svg-icons";
import { faListAlt as farListAlt } from "@fortawesome/free-regular-svg-icons";
library.add(faTrash, faListAlt, farListAlt);

function App() {
  const [tasks, setTasks] = useState([
    { title: "Pay bills", isDone: false },
    { title: "Make a to do list", isDone: true },
  ]);

  const [newTaskInput, setNewTaskInput] = useState("");
  return (
    <div>
      <Header />
      <form
        onSubmit={(event) => {
          event.preventDefault();

          // Add a new task
          const newTasks = [...tasks];
          newTasks.push({ title: newTaskInput, isDone: false });
          setTasks(newTasks);

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
                onClick={() => {
                  const newTasks = [...tasks];
                  // isDone est égal à l'inverse de lui même
                  newTasks[index].isDone = !newTasks[index].isDone;

                  setTasks(newTasks);
                }}
              />
              <span className={task.isDone === true ? "checked" : ""}>
                {task.title}
              </span>
              <button
                className="delete-button"
                onClick={() => {
                  const newTasks = [...tasks];
                  // on retire un élement à partir de index
                  newTasks.splice(index, 1);
                  setTasks(newTasks);
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
