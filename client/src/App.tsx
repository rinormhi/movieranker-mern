import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";



// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import UserProvider, { UserContext } from "./context/UserContext";
import Exclusive from "./pages/Exclusive";
import MyProfile from "./pages/MyProfile";
import axios from "axios";
import axiosInstance from "./axiosInstance";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  const { initializedUser, registrationSucceed, isAuthenticated, setIsAuthenticated, setUser } = useContext(UserContext);

  useEffect(() => {
    axiosInstance.post("http://localhost:5001/auth/checkauth")
      .then(res => {
        if (res.data.success) {
          setIsAuthenticated(true);
          setUser(res.data.user)
        } else {
          setIsAuthenticated(false);
          setUser(initializedUser);
        }
      })
      .catch(err => {
      });
  }, [])

  return (
    <>
      <div className="bg-color-dark px-4">
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="/register"
            element={registrationSucceed || isAuthenticated ? <Navigate to="/login" /> : <Register />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/exclusive"
            element={isAuthenticated ? <Navigate to="/" /> : <Exclusive />}
          />

          <Route
            path="/my-profile"
            element={isAuthenticated ? <MyProfile /> : <Navigate to="/login" />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;