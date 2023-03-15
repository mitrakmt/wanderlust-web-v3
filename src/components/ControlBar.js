import request from "../utils/request";
import trackClick from "../utils/trackClick";
import trackStat from "../utils/trackStat";

// Hooks
import { useAuth } from "../hooks/useAuth";

// Components
import FavoriteControl from "../icons/LikeIcon";
import ShareIcon from "../icons/ShareIcon";
import InfoIcon from "../icons/InfoIcon";
import RefreshIcon from "../icons/RefreshIcon";

const ControlBar = ({ refresh, openInfoModal, cityId, currentImageFavoriteStatus, setCurrentImageFavoriteStatus, setShowAuthModal, city, country, countryInfo, attribution }) => {
  // Hooks
  const { user, userLoading } = useAuth();
  
  const toggleFavorite = () => {
    if (!user?.isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    if (currentImageFavoriteStatus) {
      trackClick('unfavorite')
      trackStat({ type: 'general', property: 'unfavorites' })
      setCurrentImageFavoriteStatus(false);
      request(`/favorites/city/${cityId}`, {
        method: 'DELETE',
        body: {}
      })
      .then((response) => {
        if (response.message) {
          // TODO: show error message snackbar
          setCurrentImageFavoriteStatus(true);
        }
      });
    } else {
      trackClick('favorite')
      trackStat({ type: 'general', property: 'favorites' })
      setCurrentImageFavoriteStatus(true);
      request(`/favorites`, {
        method: 'POST',
        body: {
          city: cityId,
        }
      })
      .then((response) => {
        if (response.message) {
          // TODO: show error message snackbar
          setCurrentImageFavoriteStatus(false);
        }
      });
    }
  }

  if (userLoading) return null;

  return (
    <div className="hidden sm:flex fixed top-6 right-0 pr-4 pb-6 w-20 h-26 transition-all justify-end" style={{ zIndex: 999 }}>
      <div className="flex flex-col space-y-4">
        <RefreshIcon refresh={refresh} />
        <InfoIcon openInfoModal={openInfoModal} />
        <ShareIcon city={city} country={country} countryInfo={countryInfo} attribution={attribution} />
        {
          cityId && user &&
            <FavoriteControl toggleFavorite={toggleFavorite} currentImageFavoriteStatus={currentImageFavoriteStatus} showBackground={true} forHomePage={true} />
        }
      </div>
    </div>
  );
};

export default ControlBar;
