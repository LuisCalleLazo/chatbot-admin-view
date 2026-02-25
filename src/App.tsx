import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AdminRouter } from "./routes";
import { ToastContainer } from "react-toastify";
import { HomeRouter } from "./routes/HomeRouter";

function App() {

  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/login" element={<h1>HOLA</h1>} />
        <Route path="/*" element={<HomeRouter/>} />
      </Routes>
      <ToastContainer autoClose={1300} className="custom-toast-container" />
    </>
  );
}

export default App;
