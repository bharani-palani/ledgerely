import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../../security/protectedRoute";
import ErrorPage from "./errorpage";
import { UserContext } from "../../contexts/UserContext";

const Wrapper = props => {
  const userContext = useContext(UserContext);
  const menu = userContext.userData.menu;
  return (
    <Routes>
      {menu.length > 0 &&
        menu.map((m, i) => {
          return (
            <Route
              key={i}
              path={m.href}
              element={
                <ProtectedRoute key={m.page_id} accessGiven={m.hasAccessTo}>
                  {m.component}
                </ProtectedRoute>
              }
            />
          );
        })}
      {userContext.userData.userId && (
        <Route
          path='/'
          element={() => <Navigate to='/dashboard' replace={true} />}
        />
      )}
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default Wrapper;
