import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { FavoriteContext } from '../context/FavoriteContext';

const Navbar = ({ theme, toggleTheme }) => {
  const { favorites } = useContext(FavoriteContext);

  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark bg-dark border-bottom border-secondary' : 'navbar-light bg-white border-bottom'} px-4 py-3 sticky-top shadow-sm`} style={{ backdropFilter: 'blur(10px)', backgroundOpacity: 0.9 }}>
      <div className="container-fluid">
        
        {/* Brand Logo with Icon */}
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2 text-decoration-none" to="/">
          <span className="bg-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '38px', height: '38px', fontSize: '1.2rem' }}>
            📚
          </span>
          <span className="text-dark fw-extrabold tracking-tight">
            My<span className="text-primary">Library</span>
          </span>
        </Link>
        
        {/* Actions & Links Group */}
        <div className="d-flex align-items-center gap-3">
          
          {/* Navigation Links */}
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive 
                ? "btn btn-light px-3 py-2 rounded-pill fw-bold text-primary shadow-sm border" 
                : "btn btn-link px-3 py-2 text-secondary text-decoration-none fw-medium"
            }
          >
            Home
          </NavLink>
          
          {/* Favorites Button with Animated Badge */}
          <Link 
            to="/favorites" 
            className="btn btn-outline-danger px-3 py-2 rounded-pill position-relative fw-medium d-flex align-items-center gap-2 shadow-sm"
          >
            <span>❤️ Favorites</span>
            {favorites.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow-sm border border-light px-2 py-1">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-secondary'} rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm`}
            style={{ width: '40px', height: '40px' }}
            title="Toggle Theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;