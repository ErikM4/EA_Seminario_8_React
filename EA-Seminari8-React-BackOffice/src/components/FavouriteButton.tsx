import { useStore } from '@nanostores/react';
import type { Book } from '../models';
import { favoritesStore, toggleFavorite } from '../stores/favoritesStore';

interface FavouriteButtonProps {
  book: Book;
}

export function FavouriteButton({ book }: FavouriteButtonProps) {
  const favorites = useStore(favoritesStore);
  const isFavorite = favorites.some((fav) => fav._id === book._id);

  return (
    <button
      type="button"
      className={isFavorite ? 'danger' : 'button secondary'}
      onClick={() => toggleFavorite(book)}
    >
      {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
    </button>
  );
}