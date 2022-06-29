import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Index";
import Header from "./components/header/Index";
import AboutPage from "./pages/about/Index";
import HomePage from "./pages/home/Index";
import LoginPage from "./pages/login/Index";
import RegisterPage from "./pages/register/Index";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Container maxWidth="lg" sx={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
