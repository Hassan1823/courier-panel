import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyAdmin from "./components/verifyAdmin/VerifyAdmin";
import { AuthContext } from "./context/AuthContext";
import { DarkModeContext } from "./context/darkModeContext";
import { ShippingColumns } from "./datatablesource";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ShippingList from "./pages/shippingList/ShippingList";
import "./style/dark.scss";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />

          <Route
            path="shipping"
            element={
              <Routes>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <ShippingList columns={ShippingColumns} />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            }
          />

          <Route path="/:verifyAdmin" element={<VerifyAdmin />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
