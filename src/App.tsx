import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AdminRouter } from "./routes";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/login" element={<h1>HOLA</h1>} />
      </Routes>
      <ToastContainer autoClose={1300} className="custom-toast-container" />
    </>
  );
}

export default App;
