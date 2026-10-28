import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const Home = ({ theme }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeQuery, setActiveQuery] = useState('science'); 
  const [category, setCategory] = useState('science');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(activeQuery)}&limit=40`);
        const data = await response.json();
        
        const formattedBooks = data.docs.map((book) => ({
          id: book.key.replace('/works/', ''),
          volumeInfo: {
            title: book.title,
            authors: book.author_name || ['Unknown Author'],
            categories: book.subject || ['General'],
            imageLinks: {
              thumbnail: book.cover_i 
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` 
                : 'https://via.placeholder.com/128x192?text=No+Image'
            },
            description: book.first_sentence ? book.first_sentence[0] : 'No description available for this book.'
          }
        }));
        
        setBooks(formattedBooks);
      } catch (err) {
        setError('Books load karne mein masla aa raha hai.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [activeQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      setActiveQuery(searchTerm);
      setCategory('all');
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCat = e.target.value;
    setCategory(selectedCat);
    
    if (selectedCat === 'science') setActiveQuery('science');
    else if (selectedCat === 'fiction') setActiveQuery('fiction');
    else if (selectedCat === 'history') setActiveQuery('history');
    else if (selectedCat === 'biography') setActiveQuery('biography');
    else if (selectedCat === 'all') setActiveQuery('books');
  };

  const isDark = theme === 'dark';

  return (
    <div 
      className="py-4 px-3 px-md-5" 
      style={{ 
        backgroundColor: isDark ? '#121212' : '#fcfdff', 
        color: isDark ? '#ffffff' : '#212529',
        minHeight: '100vh', 
        transition: 'all 0.3s ease' 
      }}
    >
      
      {/* Editorial Header Section */}
      <div className={`row align-items-center mb-5 pb-3 border-bottom ${isDark ? 'border-secondary' : ''}`}>
        <div className="col-lg-8">
          <span className={`badge px-3 py-2 rounded-pill fw-semibold mb-3 ${isDark ? 'bg-primary text-white' : 'bg-primary bg-opacity-10 text-primary'}`}>
            📚 Digital Library Catalog
          </span>
          <h1 className={`fw-extrabold display-6 mb-1 ${isDark ? 'text-white' : 'text-dark'}`}>
            Explore & Discover Reads
          </h1>
          <p className={isDark ? 'text-light opacity-75' : 'text-secondary'}>
            Browse through thousands of literary masterpieces and research archives.
          </p>
        </div>
      </div>
      
      {/* Advanced Filter Toolbar */}
      <div 
        className="card border-0 shadow-sm rounded-4 p-4 mb-5" 
        style={{ 
          backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
          color: isDark ? '#ffffff' : '#000000',
          border: isDark ? '1px solid #333' : 'none'
        }}
      >
        <div className="row align-items-center gy-3">
          
          {/* Search Input Form */}
          <div className="col-lg-7">
            <form 
              onSubmit={handleSearch} 
              className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden"
              style={{
                backgroundColor: isDark ? '#2b2b2b' : '#ffffff',
                border: isDark ? '1px solid #444' : '1px solid #dee2e6'
              }}
            >
              <span className="input-group-text bg-transparent border-0 ps-4 opacity-75">🔍</span>
              <input 
                type="text" 
                className="form-control border-0 shadow-none fs-6 ps-2" 
                style={{ 
                  backgroundColor: 'transparent', 
                  color: isDark ? '#ffffff' : '#000000' 
                }}
                placeholder="Search title, author or keyword..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-primary px-4 fw-medium rounded-pill m-1">
                Search
              </button>
            </form>
          </div>
          
          {/* Category Dropdown Selector */}
          <div className="col-lg-5">
            <div 
              className="d-flex align-items-center rounded-pill px-3 py-1 shadow-sm"
              style={{
                backgroundColor: isDark ? '#2b2b2b' : '#ffffff',
                border: isDark ? '1px solid #444' : '1px solid #dee2e6'
              }}
            >
              <span className="small fw-bold text-uppercase me-2 text-nowrap opacity-75">Filter:</span>
              <select 
                className="form-select border-0 shadow-none bg-transparent fs-6 py-2" 
                style={{ 
                  color: isDark ? '#ffffff' : '#000000',
                  colorScheme: isDark ? 'dark' : 'light'
                }}
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="all" style={{ backgroundColor: isDark ? '#2b2b2b' : '#ffffff' }}>🌐 All Categories</option>
                <option value="fiction" style={{ backgroundColor: isDark ? '#2b2b2b' : '#ffffff' }}>📖 Fiction / Novels</option>
                <option value="science" style={{ backgroundColor: isDark ? '#2b2b2b' : '#ffffff' }}>🔬 Science / Tech</option>
                <option value="history" style={{ backgroundColor: isDark ? '#2b2b2b' : '#ffffff' }}>🏛️ History</option>
                <option value="biography" style={{ backgroundColor: isDark ? '#2b2b2b' : '#ffffff' }}>👤 Biography</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Loading State Spinner */}
      {loading && (
        <div className="text-center py-5 my-5">
          <div className="spinner-grow text-primary" style={{ width: '3.5rem', height: '3.5rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 fw-medium opacity-75">Gathering books for you...</p>
        </div>
      )}
      
      {/* Error State Banner */}
      {error && (
        <div className="alert alert-danger text-center py-4 rounded-4 shadow-sm my-5" role="alert">
          <h5 className="mb-0 text-danger fw-bold">{error}</h5>
        </div>
      )}

      {/* Books Dynamic Display Grid */}
      {!loading && !error && (
        books.length === 0 ? (
          <div 
            className="text-center py-5 my-5 rounded-4 shadow-sm p-5"
            style={{ 
              backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
              border: isDark ? '1px solid #333' : '1px solid #dee2e6'
            }}
          >
            <div className="display-4 mb-3">📭</div>
            <h3 className="fw-bold mb-2">No Books Discovered</h3>
            <p className="mb-0 opacity-75">Try searching with a different term or select another category filter.</p>
          </div>
        ) : (
          <div className="row g-4">
            {books.map((book) => (
              <div className="col-sm-6 col-md-4 col-xl-3" key={book.id}>
                <div className="h-100">
                  <BookCard book={book} theme={theme} />
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Home;