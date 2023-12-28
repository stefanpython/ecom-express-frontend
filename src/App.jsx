import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
