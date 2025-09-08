import { useEffect, useState } from "react";
import styles from "./Todo.module.scss";
import { Link } from "react-router-dom";

function Display({ children }) {
  return <h1 className={styles.title}>{children}</h1>;
}

function Button({ children, onClick, type }) {
  return (
    <button type={type} className={styles.navBtn} onClick={onClick}>
      {children}
    </button>
  );
}

function Modal({ visible, onClose, children }) {
  if (!visible) return null;
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  return (
    <div
      className={`${styles.modal} ${styles.show}`}
      onClick={handleOverlayClick}
    >
      <div className={styles.modalContent}>
        {children}
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}

function TaskInput({ value, onChange, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() !== "") onSubmit(value);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Nhập tên task..."
        className={styles.input}
      />
      <Button type="submit">Add Task</Button>
    </form>
  );
}

function Task({ task, onToggle, onDelete }) {
  return (
    <div className={styles.task}>
      <input type="checkbox" checked={task.completed} onChange={onToggle} />
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.text}
      </span>
      <button className={styles.deleteBtn} onClick={onDelete}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}

let uniqId = 0;

function Todo() {
  const texts = [];
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    function typeText(index = 0, charIndex = 0) {
      if (index >= texts.length) {
        setStep(texts.length);
        return;
      }
      if (charIndex < texts[index].length) {
        setTyped((prev) => prev + texts[index][charIndex]);
        setTimeout(() => typeText(index, charIndex + 1), 50);
      } else {
        setTimeout(() => {
          setTyped("");
          typeText(index + 1, 0);
        }, 1000);
      }
    }
    typeText();
  }, []);

  const handleAddTask = (text) => {
    setTasks([...tasks, { id: ++uniqId, text, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className={styles.root}>
      {step < texts.length ? (
        <Display>{typed}</Display>
      ) : (
        <>
          <nav className={styles.nav}>
            <div>
              <Button>
                <Link to="/">
                  <i className="fa-solid fa-house"></i>
                </Link>
              </Button>
              <Button onClick={() => setModalVisible(true)}>
                <i className="fa-solid fa-plus"></i>
              </Button>
            </div>
            {tasks.length > 0 && (
              <span className={styles.counter}>
                {tasks.filter((t) => t.completed).length} / {tasks.length}{" "}
                completed
              </span>
            )}
          </nav>
          <div className={styles.taskList}>
            {tasks.map((t) => (
              <Task
                key={t.id}
                task={t}
                onToggle={() => toggleTask(t.id)}
                onDelete={() => deleteTask(t.id)}
              />
            ))}
          </div>
          <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <TaskInput
              value={newTask}
              onChange={setNewTask}
              onSubmit={handleAddTask}
            />
          </Modal>
        </>
      )}
    </div>
  );
}

export default Todo;
