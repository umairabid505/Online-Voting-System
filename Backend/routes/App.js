
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CandidateList from "./CandidateList";
import BlockchainView from "./BlockchainView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidate" element={<CandidateList />} />
        <Route path="/blockchain" element={<BlockchainView />} />
      </Routes>
    </Router>
  );
}

export default App;
