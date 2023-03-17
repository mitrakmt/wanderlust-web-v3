import request from './request';

const removeFavorite = (id, favorites, setFavorites) => {
  console.log('favorites', favorites);
    setFavorites(favorites.filter(favorite => favorite.city?.id !== id));

    request(`/favorites/city/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
          // TODO: check if failure, add back to state
      })
    .catch((error) => {
        // TODO: check if failure, add back to state
    })
}

export default removeFavorite;