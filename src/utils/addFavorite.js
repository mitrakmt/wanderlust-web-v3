import request from './request';

const addFavorite = (cityId, favorites, setFavorites, city) => {
    request(`/favorites`, {
        method: 'POST',
        body: {
          city: cityId,
        }
      })
      .then((response) => {
          setFavorites([...favorites, ...[
            {
                city: city,
                id: response.data.id, 
                user: response.data.user,
            }
          ]]);
          // TODO: check if failure, add back to state
      })
    .catch((error) => {
        // TODO: check if failure, add back to state
    })
}

export default addFavorite;