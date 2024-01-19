import "./App.css";
import Dashboard from "./page/Dashboard";
import Login from "./page/Login"
import Police from "./page/Police"
import Traffic from "./page/Traffic";
import {Routes,Route} from "react-router-dom"

function App() {
  return (
    <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route
      path="/login"
      element={
        <Login  />
      }
    />
    <Route
      path="/police"
      element={<Police  />}
    />
    <Route path="/traffic" element={<Traffic />} />
  </Routes>
  );
}

export default App;
