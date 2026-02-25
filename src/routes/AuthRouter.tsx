import { Route, Routes } from "react-router-dom";
import { LoginView, NotFoundView, RegisterView } from "../views";

export const AuthRouter = () => {
  return (
    <Routes>
      <Route index element={<LoginView />}/>
      <Route path="login" element={<LoginView />}/>
      <Route path="register" element={<RegisterView />}/>
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
}