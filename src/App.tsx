import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Tokenomics from './pages/Tokenomics';
import Roadmap from './pages/Roadmap';
import Announcement from './pages/Announcement';
import Whitepaper from './pages/Whitepaper';
import LoadingLogo from './components/LoadingLogo';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingLogo />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tokenomics" element={<Tokenomics />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;