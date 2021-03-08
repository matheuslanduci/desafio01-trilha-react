import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function generateRandomId() {
    let repeat = true;
    let randomId = 0;

    while (repeat) {
      randomId = Math.floor(Math.random() * 1000);

      if (tasks.find((task) => task.id === randomId)) {
        repeat = true;
      } else {
        repeat = false;
      }
    }

    return randomId;
  }

  function handleCreateNewTask() {
    if (newTaskTitle.length === 0) {
      return;
    }

    const generatedId = generateRandomId();

    const newTask: Task = {
      id: generatedId!,
      isComplete: false,
      title: newTaskTitle,
    };

    setTasks((tasks) => [...tasks, newTask]);
  }

  function handleToggleTaskCompletion(id: number) {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    
    const newTasks = tasks;

    newTasks[taskIndex].isComplete = !newTasks[taskIndex].isComplete;

    setTasks([...newTasks]);
  }

  function handleRemoveTask(id: number) {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    const newTasks = tasks; 
    
    newTasks.splice(taskIndex, 1);

    setTasks([...newTasks]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
