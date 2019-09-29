import React from "react";
import tony from "./tony.jpg";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={tony} className="App-logo" alt="tony" />
        <p>
          Edit <code>src/App.tsx</code> THIS SIS OWRKING
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn huh
        </a>
      </header>
    </div>
  );
};

export default App;
