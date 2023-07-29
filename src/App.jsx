import { useState, useEffect, useRef } from "react";

import InputComponent from "./components/InputComponent";
import ListComponent from "./components/ListComponent";

import "./App.css";

function App() {
  return (
    <div id="container">
      <Task />
    </div>
  );
}

const Task = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [updating, setUpdating] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const storedData = localStorage.getItem("myArray");
    const parsedData = JSON.parse(storedData);
    setTodos(parsedData || []);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const dataString = JSON.stringify(todos);
      localStorage.setItem("myArray", dataString);
    }, 1000);
  }, [todos]);

  const handleAdd = () => {
    if (input == "" && !inputRef.current.attributes.custom_attr.value == "") {
      inputRef.current.attributes.custom_attr.value = "";
      setInput("");
      setUpdating(false);
      return;
    } else if (input == "") {
      return;
    }

    if (inputRef.current.attributes.custom_attr.value == "") {
      setTodos([...todos, input]);
      setInput("");
      return;
    }

    let index = inputRef.current.attributes.custom_attr.value;
    const newArray = [...todos];
    newArray[index] = input;
    setTodos(newArray);
    inputRef.current.attributes.custom_attr.value = "";
    setInput("");
    setUpdating(false);
  };

  const handleRemove = (id) => {
    let newArray = todos.filter((_, index) => index !== id);
    setTodos(newArray);

    inputRef.current.attributes.custom_attr.value = "";
    setInput("");
    setUpdating(false);
  };

  const handleUpdate = (id, item) => {
    setUpdating(true);
    setInput(item);
    inputRef.current.attributes.custom_attr.value = id;
  };

  const handleClear = () => {
    setTodos([]);

    inputRef.current.attributes.custom_attr.value = "";
    setInput("");
    setUpdating(false);
  };

  return (
    <div id="to-do-wrapper">
      <h1 id="title">Todo App</h1>
      {updating && (
        <span style={{ color: "rgb(100, 100, 255)" }}>
          Updating the task number{" "}
          {Number(inputRef.current.attributes.custom_attr.value) + 1} . . .
        </span>
      )}

      <InputComponent
        input={input}
        setInput={setInput}
        inputRef={inputRef}
        handleAdd={handleAdd}
        updating={updating}
      />

      <ListComponent
        todos={todos}
        handleUpdate={handleUpdate}
        handleRemove={handleRemove}
      />
      {todos.length == 0 ? (
        <></>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1.5rem",
          }}>
          <button
            type="button"
            style={{
              background: "rgb(255, 75, 75)",
              color: "white",
              padding: ".5rem",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
            onClick={() => {
              handleClear();
            }}>
            Clear List
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
