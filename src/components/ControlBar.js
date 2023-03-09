import React from "react";
import request from "../utils/request";
import trackClick from "../utils/trackClick";
import trackStat from "../utils/trackStat";

// Hooks
import { useAuth } from "../hooks/useAuth";

// Components
import FavoriteControl from "../icons/likeIcon";
import ShareIcon from "../icons/shareIcon";
import InfoIcon from "../icons/infoIcon";
import RefreshIcon from "../icons/refreshIcon";

const ControlBar = ({ refresh, openInfoModal, cityId, currentImageFavoriteStatus, setCurrentImageFavoriteStatus, setShowAuthModal, city, country, countryInfo, attribution }) => {
  // Hooks
  const { user } = useAuth();
  
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

  return (
    <div className="fixed bottom-0 right-0 pr-6 pb-6 w-full h-26 transition-all flex justify-end" style={{ zIndex: 999 }}>
      <div className="flex">
        {
          cityId && 
            <FavoriteControl toggleFavorite={toggleFavorite} currentImageFavoriteStatus={currentImageFavoriteStatus} showBackground={true} />
        }
        <RefreshIcon refresh={refresh} />
        <InfoIcon openInfoModal={openInfoModal} />
        <ShareIcon city={city} country={country} countryInfo={countryInfo} attribution={attribution} />
      </div>
    </div>
  );
};

export default ControlBar;
