import { LoginPage } from "./pages/auth/LoginPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  selectAuthState,
  signInRedux,
  signOutRedux,
} from "./features/user/authSlice";
import { useEffect } from "react";
import { api } from "./services/api";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isLogged } = useAppSelector(selectAuthState);
  const { validateToken } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        if (!(await validateToken(token))) {
          dispatch(signOutRedux());
          api.defaults.headers.common["Authorization"] = "";
          navigate("/");
          return;
        }
        dispatch(signInRedux(token));
        api.defaults.headers.common["Authorization"] = token;
      }
    })();
  }, [dispatch]);

  return (
    <div className="App">
      {!isLogged ? (
        // If the user is not logged, show the auth pages
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      ) : (
        // if the user is logged, show the application
        <Routes>
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
