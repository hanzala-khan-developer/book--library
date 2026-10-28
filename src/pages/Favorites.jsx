import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteContext } from '../context/FavoriteContext';
import BookCard from '../components/bookCard';

const Favorites = () => {
  const { favorites } = useContext(FavoriteContext);
  if (favorites.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h1 className="display-4 mb-3">🤍</h1>
        <h2 className="fw-bold mb-3">No Favorites Yet</h2>
        <p className="text-muted mb-4">Start adding books you love to your collection.</p>
        <Link to="/" className="btn btn-dark px-4 py-2 rounded-pill">Browse Books</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold">❤️ Your Favorites</h2>
      <div className="row">
        {favorites.map((book) => (
          <div className="col-md-4 col-lg-3 mb-4" key={book.id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Favorites;