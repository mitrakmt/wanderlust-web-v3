// List of predefined locations with known Street View imagery
const predefinedLocations = [
  { lat: 40.748817, lng: -73.985428 }, // New York, USA
  { lat: 48.858844, lng: 2.294351 }, // Paris, France
  { lat: 35.658581, lng: 139.745438 }, // Tokyo, Japan
  { lat: -33.856784, lng: 151.215297 }, // Sydney, Australia
  { lat: 51.500729, lng: -0.124625 }, // London, UK
  { lat: -22.951916, lng: -43.210487 }, // Rio de Janeiro, Brazil
  { lat: 34.052235, lng: -118.243683 }, // Los Angeles, USA
  { lat: 41.902782, lng: 12.496366 }, // Rome, Italy
  { lat: 55.755825, lng: 37.617298 }, // Moscow, Russia
  { lat: 19.432608, lng: -99.133209 }, // Mexico City, Mexico
  { lat: 39.904202, lng: 116.407394 }, // Beijing, China
  { lat: 37.774929, lng: -122.419418 }, // San Francisco, USA
  { lat: -34.603722, lng: -58.381592 }, // Buenos Aires, Argentina
  { lat: 52.520008, lng: 13.404954 }, // Berlin, Germany
  { lat: 40.416775, lng: -3.703790 }, // Madrid, Spain
  { lat: 35.689487, lng: 139.691711 }, // Tokyo, Japan
  { lat: -37.813629, lng: 144.963058 }, // Melbourne, Australia
  { lat: 1.352083, lng: 103.819839 }, // Singapore
  { lat: -26.204103, lng: 28.047304 }, // Johannesburg, South Africa
  { lat: 30.044420, lng: 31.235712 }, // Cairo, Egypt
  { lat: -33.448891, lng: -70.669266 }, // Santiago, Chile
  { lat: 51.165691, lng: 10.451526 }, // Germany
  { lat: 35.861660, lng: 104.195397 }, // China
  { lat: -25.274398, lng: 133.775136 }, // Australia
  { lat: 36.204823, lng: 138.252930 }, // Japan
  { lat: 23.634501, lng: -102.552788 }, // Mexico
  { lat: 20.593684, lng: 78.962883 }, // India
  { lat: 56.130366, lng: -106.346771 }, // Canada
  { lat: 55.378051, lng: -3.435973 }, // United Kingdom
  { lat: 46.603354, lng: 1.888334 }, // France
  { lat: 36.778259, lng: -119.417931 }, // California, USA
  { lat: 14.599512, lng: 120.984222 }, // Manila, Philippines
  { lat: 50.850346, lng: 4.351721 }, // Brussels, Belgium
  { lat: -1.292066, lng: 36.821945 }, // Nairobi, Kenya
  { lat: 33.684422, lng: 73.047882 }, // Islamabad, Pakistan
  { lat: 31.230391, lng: 121.473701 }, // Shanghai, China
  { lat: -3.745, lng: -38.523 }, // Fortaleza, Brazil
  { lat: -12.046374, lng: -77.042793 }, // Lima, Peru
  { lat: 32.085300, lng: 34.781769 }, // Tel Aviv, Israel
  { lat: 6.524379, lng: 3.379206 }, // Lagos, Nigeria
  { lat: -33.924870, lng: 18.424055 }, // Cape Town, South Africa
  { lat: 35.676192, lng: 139.650311 }, // Tokyo, Japan
  { lat: 45.464211, lng: 9.191383 }, // Milan, Italy
  { lat: 43.653225, lng: -79.383186 }, // Toronto, Canada
  { lat: 45.501690, lng: -73.567253 }, // Montreal, Canada
  { lat: 34.693738, lng: 135.502165 }, // Osaka, Japan
  { lat: 39.739236, lng: -104.990251 }, // Denver, USA
  { lat: 59.329323, lng: 18.068581 }, // Stockholm, Sweden
  { lat: 52.367984, lng: 4.903561 }, // Amsterdam, Netherlands
  { lat: 55.676098, lng: 12.568337 }, // Copenhagen, Denmark
  { lat: 60.169856, lng: 24.938379 }, // Helsinki, Finland
  { lat: -23.550520, lng: -46.633308 }, // São Paulo, Brazil
  { lat: 28.704060, lng: 77.102493 }, // New Delhi, India
  { lat: 13.756331, lng: 100.501762 }, // Bangkok, Thailand
  { lat: -6.208763, lng: 106.845599 }, // Jakarta, Indonesia
  { lat: -35.282001, lng: 149.128998 }, // Canberra, Australia
  { lat: -41.286461, lng: 174.776230 }, // Wellington, New Zealand
  { lat: -36.848460, lng: 174.763332 }, // Auckland, New Zealand
  { lat: 35.027251, lng: 135.753601 }, // Kyoto, Japan
  { lat: 51.507351, lng: -0.127758 }, // London, United Kingdom
  { lat: 34.052235, lng: -118.243683 }, // Los Angeles, USA
  { lat: 41.385063, lng: 2.173404 }, // Barcelona, Spain
  { lat: 43.710173, lng: 7.261953 }, // Nice, France
  { lat: 50.075538, lng: 14.437800 }, // Prague, Czech Republic
  { lat: 48.208174, lng: 16.373819 }, // Vienna, Austria
  { lat: 53.349805, lng: -6.260310 }, // Dublin, Ireland
  { lat: 59.913869, lng: 10.752245 }, // Oslo, Norway
  { lat: 60.451813, lng: 22.266630 }, // Turku, Finland
  { lat: 64.135482, lng: -21.895411 }, // Reykjavik, Iceland
  { lat: 48.856613, lng: 2.352222 }, // Paris, France
  { lat: 35.689487, lng: 139.691711 }, // Tokyo, Japan
  { lat: 55.953251, lng: -3.188267 }, // Edinburgh, United Kingdom
  { lat: 40.712776, lng: -74.005974 }, // New York, USA
  { lat: 25.276987, lng: 55.296249 }, // Dubai, UAE
  { lat: 24.713552, lng: 46.675297 }, // Riyadh, Saudi Arabia
  { lat: 31.768319, lng: 35.213710 }, // Jerusalem, Israel
];

import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import useLoadGoogleMaps from '../hooks/useLoadGoogleMaps';

const LIBRARIES = ['places', 'maps'];

const GeoGuessrClone = () => {
  const { isLoaded, error } = useLoadGoogleMaps(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, LIBRARIES);
  const [googleMaps, setGoogleMaps] = useState(null);
  const [location, setLocation] = useState(null);
  const [guess, setGuess] = useState(null);
  const [distance, setDistance] = useState(null);
  const [score, setScore] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showCorrectLocation, setShowCorrectLocation] = useState(false);
  const [streetViewAvailable, setStreetViewAvailable] = useState(false);
  const [polyline, setPolyline] = useState(null);
  const mapRef = useRef(null);
  const streetViewRef = useRef(null);

  useEffect(() => {
    if (isLoaded && window.google) {
      setGoogleMaps(window.google.maps);
      fetchLocationAndImage(window.google.maps);
    }
  }, [isLoaded]);

  const getRandomPredefinedLocation = () => {
    const randomIndex = Math.floor(Math.random() * predefinedLocations.length);
    return predefinedLocations[randomIndex];
  };

  const handleMapClick = (event) => {
    setGuess({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  const calculateDistance = (loc1, loc2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
    const dLng = (loc2.lng - loc1.lng) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(loc1.lat * (Math.PI / 180)) * Math.cos(loc2.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  const calculateScore = (distance) => {
    const maxDistance = 20000; // Max distance in km
    return Math.max(0, Math.round(5000 * (1 - distance / maxDistance)));
  };

  const handleSubmit = () => {
    const dist = calculateDistance(location, guess);
    setDistance(dist);
    setScore(calculateScore(dist));
    setShowCorrectLocation(true);
    setShowPopup(true);

    if (mapRef.current && googleMaps) {
      const bounds = new googleMaps.LatLngBounds();
      bounds.extend(new googleMaps.LatLng(location.lat, location.lng));
      bounds.extend(new googleMaps.LatLng(guess.lat, guess.lng));
      mapRef.current.fitBounds(bounds);

      // Draw the polyline between the guess and the actual location
      setPolyline([
        { lat: location.lat, lng: location.lng },
        { lat: guess.lat, lng: guess.lng }
      ]);
    }
  };

  const handleNextLocation = () => {
    setShowPopup(false);
    setGuess(null);
    setDistance(null);
    setScore(null);
    setShowCorrectLocation(false);
    setPolyline(null);
    fetchLocationAndImage(googleMaps);
  };

  const fetchLocationAndImage = (maps) => {
    const randomLocation = getRandomPredefinedLocation();
    setLocation(randomLocation);

    const streetViewService = new maps.StreetViewService();
    streetViewService.getPanorama(
      { location: randomLocation, radius: 50 },
      (data, status) => {
        if (status === 'OK') {
          setStreetViewAvailable(true);
          if (streetViewRef.current) {
            new maps.StreetViewPanorama(streetViewRef.current, {
              position: randomLocation,
              pov: { heading: 100, pitch: 0 },
              visible: true,
              disableDefaultUI: true
            });
          }
        } else {
          setStreetViewAvailable(false);
          fetchLocationAndImage(maps); // Try another location if Street View is not available
        }
      }
    );
  };

  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const defaultCenter = { lat: 0, lng: 0 };

  if (error) return <div>Error loading maps: {error.message}</div>;
  if (!isLoaded || !googleMaps) return <div>Loading...</div>;

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <div ref={streetViewRef} style={mapStyles}></div>
      </div>
      <div className="flex-1 relative">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={2}
          center={defaultCenter}
          onClick={handleMapClick}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          className="map-container"
          options={{
            clickableIcons: false,
            disableDefaultUI: true,
          }}
        >
          {guess && (
            <Marker
              position={guess}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              }}
            />
          )}
          {showCorrectLocation && location && (
            <Marker
              position={location}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
            />
          )}
          {polyline && (
            <Polyline
              path={polyline}
              options={{
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
              }}
            />
          )}
        </GoogleMap>
        {guess && !showPopup && (
          <button
            onClick={handleSubmit}
            className="absolute bottom-4 left-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        )}
        {showPopup && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg text-center">
              <h2 className="text-2xl font-bold">Results</h2>
              <p className="mt-4">Your guess was {distance} km away from the actual location.</p>
              <p className="mt-2">You scored {score} out of 5000.</p>
              <button
                onClick={handleNextLocation}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Next Location
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeoGuessrClone;