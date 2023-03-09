import React, { useState, useContext } from 'react';
import Map, { Marker } from 'react-map-gl';

// Context
import { themeContext } from '../../context/ThemeProvider';

// Components
import PlaceCard from './PlaceCard';

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

const randomNumberSelected = getRandomNumber();

export default function PlacesMap({ coordinates, places }) {
    // State
    const [selectedMarker, setSelectedMarker] = useState(null);

    // Context
    const [theme] = useContext(themeContext);

    const closePlaceOverlay = () => {
        setSelectedMarker(null);
    }

    return (
        <Map
            initialViewState={{
                latitude: coordinates[1],
                longitude: coordinates[0],
                zoom: 12.5
            }}
            minZoom={4.0}
            attributionControl={false}
            renderWorldCopies={true}
            style={{
                width: '100%',
                height: '500px',
                borderRadius: '12px'
            }}
            mapboxAccessToken={mapBoxArray[randomNumberSelected]}
            mapStyle={theme === 'light' ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/dark-v11'}
        >
            {places?.map((place) => (
                <Marker
                    longitude={place.longitude}
                    latitude={place.latitude}
                    style={{ cursor: 'pointer' }}
                    anchor="bottom"
                    key={`places_map-${place.google_id}`}
                    onClick={() => setSelectedMarker(place)}
                />
            ))}
            {selectedMarker && (
                <div className="absolute bottom-10 left-2">
                    <PlaceCard google_id={selectedMarker.google_id} id={selectedMarker.id} tags={selectedMarker.tags} name={selectedMarker.name} closePlaceOverlay={closePlaceOverlay} />
                </div>
            )}
        </Map>
     
    )
}