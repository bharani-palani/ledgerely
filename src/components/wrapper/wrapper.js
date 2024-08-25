import React, { useContext, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../../security/protectedRoute";
// import ErrorPage from "./errorpage";
import { UserContext } from "../../contexts/UserContext";
import Loader from "../resuable/Loader";

const Wrapper = props => {
  const userContext = useContext(UserContext);
  const menu = userContext.userData.menu;

  return (
    <Suspense fallback={<Loader middle />}>
      <Routes>
        {menu &&
          menu?.length > 0 &&
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
        {menu?.length > 0 && userContext.userData.userId && (
          <>
            <Route
              path='/'
              element={<Navigate to='/dashboard' />}
              replace={true}
            />
          </>
        )}
        {/* <Route path='/404' element={<ErrorPage />} />
        <Route path='*' element={<Navigate to='/404' replace={true} />} /> */}
      </Routes>
    </Suspense>
  );
};

export default Wrapper;
