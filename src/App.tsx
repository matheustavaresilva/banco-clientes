import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClientDetails from "./pages/ClientDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cliente/:id" element={<ClientDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
