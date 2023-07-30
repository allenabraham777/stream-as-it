import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import StreamDashboard from "pages/StreamDashboard";
import RequireAuth from "router/RequireAuth";
import SignInPage from "pages/SignInPage";
import RequireNoAuth from "./RequireNoAuth";
import SignUpPage from "pages/SignUpPage";

type Props = {};

const AppRoutes = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="">
          <Route
            path="/stream/:streamId"
            element={
              <RequireAuth>
                <StreamDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/signin"
            element={
              <RequireNoAuth>
                <SignInPage />
              </RequireNoAuth>
            }
          />
          <Route
            path="/signup"
            element={
              <RequireNoAuth>
                <SignUpPage />
              </RequireNoAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
