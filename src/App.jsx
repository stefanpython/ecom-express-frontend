import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
