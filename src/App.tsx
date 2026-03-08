import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AdminRouter, AuthRouter, HomeRouter } from "./routes";
import { ToastContainer } from "react-toastify";
import LoadingModal from "./components/loading/LoadingModal";
import { PrivateAdminRoute, PrivateHomeRoute } from "./components/redirect/PrivateRoute";

function App() {

  return (
    <>
      <Routes>  
        <Route path="/admin/*" element={<PrivateAdminRoute element={<AdminRouter />}/> } />
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/*" element={<PrivateHomeRoute element={<HomeRouter/>} />} />
      </Routes>
      <LoadingModal />
      <ToastContainer autoClose={1300} className="custom-toast-container" />
    </>
  );
}

export default App;
