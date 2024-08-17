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
        menu.map((menu, i) => {
          return (
            <Route
              key={i}
              path={menu.href}
              element={
                <ProtectedRoute
                  key={menu.page_id}
                  accessGiven={menu.hasAccessTo}
                >
                  {menu.component}
                </ProtectedRoute>
              }
            />
          );
        })}
      {userContext.userData.userId && (
        <Route path='/' element={() => <Navigate to='/dashboard' />} />
      )}
      {menu.length > 0 && <Route path='*' element={<ErrorPage />} />}
    </Routes>
  );
};

export default Wrapper;
