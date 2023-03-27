import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [toDos, setToDos] = useState(
    JSON.parse(localStorage.getItem("toDos")) || []
  );
  const [toDo, setToDo] = useState("");
  const date = new Date();
  const dayOfWeek = date.getDay();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = dayNames[dayOfWeek];
  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  return (
    <div className="app">
      <div>
        <div className="mainHeading">
          <h1>ToDo List</h1>
        </div>
        <div className="subHeading">
          <br />
          <h2>Whoop, it's {dayName} 🌝 ☕ </h2>
        </div>
        <div className="input">
          <input
            value={toDo}
            onChange={(e) => setToDo(e.target.value)}
            type="text"
            placeholder="🖊️ Add item..."
          />
          <i
            onClick={() =>
              setToDos([
                ...toDos,
                { id: Date.now(), text: toDo, status: false },
              ])
            }
            className="fas fa-plus"></i>
        </div>
        <div className="todos">
          {toDos.map((obj) => {
            return (
              <div className="todo">
                <div className={`left ${obj.status ? "completed" : ""}`}>
                  <input
                    onChange={(e) => {
                      setToDos(
                        toDos.map((obj2) =>
                          obj2.id === obj.id
                            ? { ...obj2, status: e.target.checked }
                            : obj2
                        )
                      );
                    }}
                    checked={obj.status}
                    type="checkbox"
                    name=""
                    id=""
                  />
                  <p>{obj.text}</p>
                </div>

                <div className="right">
                  <i
                    className="fas fa-trash"
                    style={{ color: "red" }}
                    onClick={() => {
                      setToDos(
                        toDos.filter((todo) => {
                          if (todo.id !== obj.id) {
                            return todo;
                          }
                          return null;
                        })
                      );
                    }}></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
