import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClienteDetalhes from "./pages/ClientDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cliente/:id" element={<ClienteDetalhes />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;