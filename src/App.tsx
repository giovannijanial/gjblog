import { CircularProgress, Container } from "@mui/material";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Index";
import Header from "./components/header/Index";
import { AuthProvider } from "./contexts/authContext";
import { useAuthentication } from "./hooks/useAuthentication";
import AboutPage from "./pages/about/Index";
import HomePage from "./pages/home/Index";
import LoginPage from "./pages/login/Index";
import RegisterPage from "./pages/register/Index";
import { IUser } from "./interfaces/User";
import CreatePostPage from "./pages/createPost/Index";
import DashboardPage from "./pages/dashboard/Index";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const { auth } = useAuthentication();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, [auth])


  const loadingUser = user === undefined;
  if (loadingUser) {
    return <CircularProgress />
  }


  return (
    <AuthProvider user={user}>
      <BrowserRouter>
        <Header />
        <Container maxWidth="lg" sx={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" />} />
            <Route path="/post/create" element={user ? <CreatePostPage /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </ AuthProvider>
  )
}

export default App