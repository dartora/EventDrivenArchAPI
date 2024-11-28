import React, { useEffect, useState } from "react";
import { GoogleMap, Polyline, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
    width: "100%",
    height: "500px",
};

const center = { lat: -27.595378, lng: -48.54805 }; // Adjust as needed

const MapWithRoute = ({ routeData }: { routeData: any }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    });
    const [path, setPath] = useState<google.maps.LatLngLiteral[]>([]);
    const [mapCenter, setMapCenter] = useState(center);

    useEffect(() => {
        if (routeData?.overview_polyline?.points) {
            const decodedPath = decodePolyline(routeData.overview_polyline.points);
            setPath(decodedPath);

            // Set map center to the first point of the route
            if (decodedPath.length > 0) {
                setMapCenter(decodedPath[0]);
            }
        } else {
            console.error("Invalid route data:", routeData);
        }
    }, [routeData]);

    if (!isLoaded) return <div>Loading Maps API...</div>;
    if (!routeData) return <div>No route data available</div>;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={12}
        >
            {path.length > 0 && (
                <Polyline
                    path={path}
                    options={{
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.8,
                        strokeWeight: 4,
                    }}
                />
            )}
        </GoogleMap>
    );
};

// Utility function to decode polyline
const decodePolyline = (polyline: string): google.maps.LatLngLiteral[] => {
    const coords: google.maps.LatLngLiteral[] = [];
    let index = 0, lat = 0, lng = 0;

    while (index < polyline.length) {
        let result = 1, shift = 0, byte;
        do {
            byte = polyline.charCodeAt(index++) - 63 - 1;
            result += byte << shift;
            shift += 5;
        } while (byte >= 0x1f);
        lat += (result & 1) ? ~(result >> 1) : (result >> 1);

        result = 1, shift = 0;
        do {
            byte = polyline.charCodeAt(index++) - 63 - 1;
            result += byte << shift;
            shift += 5;
        } while (byte >= 0x1f);
        lng += (result & 1) ? ~(result >> 1) : (result >> 1);

        coords.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }

    return coords;
};

export default MapWithRoute; 