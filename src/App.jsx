import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Favorites from './pages/Favorites';  

function App() {
  // Theme state (LocalStorage se load karega)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Jab theme change ho, toh body pe class lagao aur localStorage save karo
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
      <Route path="/" element={<Home theme={theme} />} />
         <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/favorites" element={<Favorites />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;