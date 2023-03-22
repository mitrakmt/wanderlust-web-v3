import { useState, useContext } from 'react';
import Map, { Marker } from 'react-map-gl';

// Component
import CityDrawer from '../../../shared_components/CityDrawer';

// Context
import { themeContext } from '../../../context/ThemeProvider';

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

export default function PlacesToTryMap({ coordinates, isPublicMap, removePlace, places }) {
    // State
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [randomNumberSelected] = useState(getRandomNumber());

    // Context
    const [theme] = useContext(themeContext);

    // Functions
    const closePlaceOverlay = () => {
        setSelectedMarker(null);
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
                width: '100vw',
                height: '100vh',
                position: 'absolute',
                top: 0,
                left: 0
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

            <CityDrawer isPublicMap={isPublicMap} removePlace={removePlace} selectedMarker={selectedMarker} closePlaceOverlay={closePlaceOverlay} />
        </Map>
    )
}