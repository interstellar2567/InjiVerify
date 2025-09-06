import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Logs from "./pages/Logs";
import QRScanner from "./components/QRScanner";
import ConnectivityStatus from "./components/ConnectivityStatus";

const App: React.FC = () => {
  return (
    <Router>
      <ConnectivityStatus />
      <header className="appbar">
        <div className="container appbar-inner">
          <div className="brand">
            <span className="brand-badge" />
            <span>InjiVerify</span>
          </div>
          <nav className="menu">
            <Link to="/">Home</Link>
            <Link to="/scan">Scan</Link>
            <Link to="/logs">Logs</Link>
          </nav>
        </div>
      </header>

      <main className="page">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<QRScanner />} />
            <Route path="/logs" element={<Logs />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default App;