import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Song from "./components/song";
import Search from "./components/search";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/song/:filter/:search/:image" element={<Song />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/search" element={<Search />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
