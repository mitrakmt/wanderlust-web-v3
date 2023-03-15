import { useContext, useState } from 'react';
import Map, {Layer, Source } from 'react-map-gl';

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

export default function PlacesMap({ coordinates, user }) {
    // Context
    const [theme] = useContext(themeContext);
    const [randomNumberSelected] = useState(getRandomNumber());

    // State
    const [originalMapFilter, setOriginalMapFilter] = useState([
        "in",
        "iso_3166_1_alpha_3",
    ])

    return (
        <Map
            initialViewState={{
                latitude: coordinates[1],
                longitude: coordinates[0],
                zoom: 2
            }}
            maxZoom={10}
            minZoom={2}
            attributionControl={false}
            renderWorldCopies={true}
            style={{
                height: '700px',
                width: '100%',
                borderBottomRadius: '15px'
            }}
            mapboxAccessToken={mapBoxArray[randomNumberSelected]}
            mapStyle={theme === 'light' ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/dark-v11'}
        >
            <Source
                id="countries"
                type="vector"
                url="mapbox://mapbox.country-boundaries-v1"
            >
                <Layer
                    id="country-fill"
                    source="countries"
                    source-layer="country_boundaries"
                    type="fill"
                    paint={{
                        'fill-color': '#000',
                        'fill-opacity': 0.1,
                    }}
                />

                <Layer
                    type="fill"
                    id="country-boundaries"
                    source-layer="country_boundaries"
                    source="countries"
                    paint={{
                        'fill-color': '#3f5be1',
                        'fill-opacity': 0.35,
                    }}
                    filter={[
                        ...originalMapFilter,
                        ...user?.countries_visited
                    ]}
                />
            </Source>
        </Map>
    )
}