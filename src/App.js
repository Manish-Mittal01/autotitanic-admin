import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import publicRoutes from "./pages/publicRoutes";
import privateRoutes from "./pages/privateRoutes";
import runAxiosSetup from "./helper/axiosSetup";
import { baseApiUrl } from "./config";
import LoginChecker from "./components/common/loginChecker";
import LoadIndicator from "./components/common/load-indicator";

function App() {
  const {
    admin,
    // isAuthenticated
  } = useSelector((s) => s.auth) ?? {};
  const isAuthenticated = true;

  useLayoutEffect(() => {
    runAxiosSetup({
      apiUrl: baseApiUrl,
      bearerToken: admin?.access_token,
      headers: {
        token: admin?.access_token,
      },
    });
  }, [admin]);

  return (
    <>
      <LoginChecker />
      <LoadIndicator />
      <Routes>
        {isAuthenticated ? (
          <>
            {privateRoutes.map((data, index) => (
              <Route
                onUpdate={() => window.scrollTo(0, 0)}
                exact={true}
                path={data.path}
                element={data.component}
                key={index}
              />
            ))}
            <Route path="*" element={<Navigate replace to="/dashboard" />} />
          </>
        ) : (
          <>
            {publicRoutes.map((data, index) => (
              <Route
                onUpdate={() => window.scrollTo(0, 0)}
                exact={true}
                path={data.path}
                element={data.component}
                key={index}
              />
            ))}
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
