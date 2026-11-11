import { useStore } from '@nanostores/react';
import type { Book } from '../models';
import { favoritesStore } from '../stores/favoritesStore';
import { truncate } from '../utils/format';
import { FavouriteButton } from './FavouriteButton';

function authorNames(book: Book) {
  return book.authors?.length > 0 ? book.authors.map((author) => author.name).join(', ') : null;
}

export function FavouritesList() {
  const favorites = useStore(favoritesStore);

  return (
    <>
      <div className="page-header">
        <h1>Mis Favoritos</h1>
      </div>

      {favorites.length === 0 ? (
        <p className="muted">No tienes libros marcados como favoritos.</p>
      ) : (
        <div className="cards">
          {favorites.map((book) => (
            <article key={book._id} className="card">
              <img
                className="card-cover"
                src={`https://picsum.photos/seed/${book._id}/400/240`}
                alt={`Portada de ${book.title}`}
              />
              <div className="card-body">
                <h3>{book.title}</h3>
                <span className="muted">{authorNames(book) ?? 'Sin autores'}</span>
                {book.description && (
                  <p className="card-text" title={book.description}>
                    {truncate(book.description, 90)}
                  </p>
                )}
              </div>
              <div className="card-actions">
                <FavouriteButton book={book} />
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}