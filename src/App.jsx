import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const countValue = useSelector((state) => state?.count);
  const mode = useSelector((state) => state?.darkmode);
  const dispatch = useDispatch();

  const [themeText, setThemeText] = useState("LightMode");

  const toggleTheme = () => {
    dispatch({ type: "CHANGE_MODE" });
    setThemeText(mode ? "Darkmode" : "Light Mode");
  };

  useEffect(() => {
    if (mode) {
      document.body.classList.add("darkmode");
    } else {
      document.body.classList.remove("darkmode");
    }
  }, [mode]);

  return (
    <>
      <div>
        <div className="switchMode">
          <button onClick={toggleTheme}>{themeText}</button>
        </div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch({ type: "INCREMENT" })}>
          count is {countValue ?? 0}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
