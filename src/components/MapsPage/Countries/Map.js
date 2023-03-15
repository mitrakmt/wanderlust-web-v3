import { useContext, useState } from 'react';
import Map, { Layer, Source } from 'react-map-gl';

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

export default function Passport({ coordinates, addCountry, removeCountry, user }) {
    // Context
    const [theme] = useContext(themeContext);
    const [randomNumberSelected] = useState(getRandomNumber());

    // State
    const [originalMapFilter, setOriginalMapFilter] = useState([
        "in",
        "iso_3166_1_alpha_3",
    ])

    const onClick = event => {
        const {
            features,
            point: { x, y }
        } = event;

        const clickedFeature = features && features[0];

        if (!clickedFeature?.properties) {
            return;
        }

        // Check to see if clicked country exists in user's countries array
        const countryExists = user?.countries_visited?.find(country => country === clickedFeature.properties.iso_3166_1_alpha_3);

        if (countryExists) {
            // Remove country
            removeCountry(clickedFeature.properties.iso_3166_1_alpha_3);
        } else {
            // Add country
            addCountry(clickedFeature.properties.iso_3166_1_alpha_3);
        }
    };

    if (!user) return null;

    return (
        <Map
            interactiveLayerIds={["country-fill", "country-boundaries"]}
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
                height: '100vh',
                width: '100vw',
                position: 'absolute',
                top: 0,
                left: 0
            }}
            onClick={onClick}
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