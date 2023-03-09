import request from './request';

const removeFavorite = (id, favorites, setFavorites) => {
    setFavorites(favorites.filter(favorite => favorite.city.id !== id));

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