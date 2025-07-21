import React from "react";
import Dashboard from "./Components/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Financial Goal Tracker</h1>
      </header>
      <main className="app-main">
        <Dashboard />
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Financial Goal Tracker</p>
      </footer>
    </div>
  );
}

export default App;