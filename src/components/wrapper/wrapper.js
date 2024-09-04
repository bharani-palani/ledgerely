import React, { useContext, Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../../security/protectedRoute";
import ErrorPage from "./errorpage";
import UnAuthPage from "./UnAuthPage";
import { UserContext } from "../../contexts/UserContext";
import Loader from "../resuable/Loader";

const SignUp = lazy(() => import("../Home/Signup"));
const AccountPlanner = lazy(() => import("../accountPlanner/AccountPlanner"));
const Settings = lazy(() => import("../configuration/settings"));
const Workbook = lazy(() => import("../workbook/wokbookIndex"));
const Home = lazy(() => import("../Home/Home"));
const Credentials = lazy(() => import("../Home/Credentials"));
const Demographics = lazy(() => import("../Home/Demographics"));
const Dashboard = lazy(() => import("../Home/Dashboard/index"));
const Categories = lazy(() => import("../categories/categoryIndex"));
const Bank = lazy(() => import("../bank/bankIndex"));
const Billing = lazy(() => import("../payment/Billing"));
const CreditCard = lazy(() => import("../creditCard/creditCardIndex"));
const CreateModule = lazy(() => import("../accountPlanner/CreateModule"));
// const Intl18 = lazy(() => import("../configuration/Intl18"));
// const FileStorage = lazy(() => import("../fileStorage/FileStorage"));

const Wrapper = props => {
  const userContext = useContext(UserContext);
  const menu = userContext.userData.menu;
  const compRefObj = {
    signup: <SignUp />,
    home: <Home />,
    dashboard: <Dashboard />,
    category: <Categories />,
    bank: <Bank />,
    creditCard: <CreditCard />,
    schedules: <CreateModule />,
    moneyPlanner: <AccountPlanner />,
    workbook: <Workbook />,
    billing: <Billing />,
    settings: <Settings />,
  };

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
                    {compRefObj[m.page_id]}
                  </ProtectedRoute>
                }
              />
            );
          })}
        <Route
          path='/'
          element={
            userContext?.userData?.userId ? (
              <Navigate to='/dashboard' />
            ) : (
              <Home />
            )
          }
        />
        <Route path='/signup/*' element={<SignUp />} />
        <Route
          path='/signup'
          element={
            userContext?.userData?.userId ? (
              <Navigate to='/dashboard' />
            ) : (
              <SignUp />
            )
          }
        >
          <Route path='credentials' element={<Credentials />} />
          <Route path='demographics' element={<Demographics />} />
        </Route>
        <Route path='/404' element={<ErrorPage />} />
        <Route path='/401' element={<UnAuthPage />} />
        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
    </Suspense>
  );
};

export default Wrapper;
