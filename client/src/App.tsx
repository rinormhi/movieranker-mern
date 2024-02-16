import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { TailSpin } from 'react-loader-spinner'

// Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import UserProvider, { UserContext } from "./context/UserContext";
import FilterProvider, { FilterContext } from "./context/FilterContext";
import MyProfile from "./pages/MyProfile";
import Movies from "./pages/Movies";
import MoviePage from "./pages/MoviePage";
import FavoriteMovies from "./pages/FavoriteMovies";
import Results from "./pages/Results";

// ...
import axiosInstance from "./axiosInstance";

function App() {
  const providers = [
    UserProvider,
    FilterProvider,
  ];

  const composedProviders = providers.reduce((children, Provider) => (
    <Provider>{children}</Provider>
  ), <AppContent />);

  return (
    <BrowserRouter>
      {composedProviders}
    </BrowserRouter>
  );
}

function AppContent() {
  const [authChecked, setAuthChecked] = useState(false);
  const { user, setUser, resetUser } = useContext(UserContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.post("/auth/checkauth");
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          resetUser();
          console.log("not logged in");
        }
      } catch (error) {
        console.log("/auth/checkauth ERROR:", error);
      } finally {
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, []);

  if (!authChecked) {
    return <TailSpin
      height="50"
      width="50"
      color="text"
    />
  }

  return (
    <>
      <div className="bg-color-dark">
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="/register"
            element={user.registrationSucceed || user._id ? <Navigate to="/login" /> : <Register />} />
          <Route
            path="/login"
            element={user._id ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/movies"
            element={<Movies />} />
          <Route
            path="/favorite-movies"
            element={user._id ? (<FavoriteMovies />) : <Navigate to="/login" />}
          />
          <Route
            path="/my-profile"
            element={user._id ? <MyProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/movie/:MOVIEID"
            element={<MoviePage />}
          />
          <Route
            path="/results"
            element={<Results />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;