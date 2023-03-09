import React, { useState, useContext } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';

// Hooks
import { useRouter } from 'next/router';

// Context
import { themeContext } from '../../context/ThemeProvider';

// Components
import CityCard from './CityCard';

import '../../styles/map.module.scss';

// Mapbox token array
const mapBoxArray = [
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN1,
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN2,
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN3,
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN4
]

const getRandomNumber = () => {
    return Math. floor(Math. random() * (3 - 0 + 1)) + 0;
}

export default function TravelListMap({ isPublicMap, coordinates, removeCity, toVisit }) {
    // State
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [randomNumberSelected] = useState(getRandomNumber());

    // Hooks
    const router = useRouter();

    // Context
    const [theme] = useContext(themeContext);

    const closeCityOverlay = () => {
        setSelectedMarker(null);
    }

    const triggerViewCity = () => {
        router.push(`/city/${selectedMarker.id}`)
    }

    return (
        <Map
            initialViewState={{
                latitude: coordinates[1],
                longitude: coordinates[0],
                zoom: 2
            }}
            minZoom={2.0}
            attributionControl={false}
            renderWorldCopies={true}
            style={{
                height: '100vh',
                width: '100vw',
                position: 'absolute', 
                top: 0,
                left: 0
            }}
            mapboxAccessToken={mapBoxArray[randomNumberSelected]}
            mapStyle={theme === 'light' ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/dark-v11'}
        >
            {toVisit?.map((city) => (
                <Marker
                    longitude={city.longitude}
                    latitude={city.latitude}
                    style={{ cursor: 'pointer' }}
                    anchor="bottom"
                    key={`cities_map-${city.id}`}
                    onClick={() => setSelectedMarker(city)}
                />
            ))}
            {selectedMarker && (
                <div className="absolute bottom-10 left-2">
                    <CityCard isPublicMap={isPublicMap} id={selectedMarker.id} city={selectedMarker.name} country={selectedMarker.country_name} image={selectedMarker.image_url_small} closeCityOverlay={closeCityOverlay} removeCity={removeCity} viewCity={triggerViewCity}  />
                </div>
            )}
        </Map>
     
    )
}