// app/components/Map.tsx
import React, { useEffect, useState } from 'react';

let MapContainer: any;
let TileLayer: any;
let Marker: any;
let Popup: any;
let useMapEvents: any;
let L: any;

export default function Map() {
    const [isClient, setIsClient] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (typeof window !== 'undefined') {
            // Dynamically import Leaflet and react-leaflet components
            Promise.all([
                import('leaflet').then((leaflet) => {
                    L = leaflet;
                    delete (L.Icon.Default.prototype as any)._getIconUrl;
                    L.Icon.Default.mergeOptions({
                        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                    });
                }),
                import('react-leaflet').then((reactLeaflet) => {
                    MapContainer = reactLeaflet.MapContainer;
                    TileLayer = reactLeaflet.TileLayer;
                    Marker = reactLeaflet.Marker;
                    Popup = reactLeaflet.Popup;
                    useMapEvents = reactLeaflet.useMapEvents;
                }),
            ]).then(() => setIsLoaded(true));
        }
    }, []);

    if (!isClient || !isLoaded) {
        return <div>Loading map...</div>;
    }


     // London

    const LocationMarker = () => {
        const [position, setPosition] = useState<any>(null);

        const map = useMapEvents({
            click() {
              map.locate()
            },
            locationfound(e) {
              setPosition(e.latlng)
              map.flyTo(e.latlng, map.getZoom())
            },
          })

        return position === null ? null : (
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        );
    };


    return (
        <div className="w-full h-[80vh] py-4">
            <MapContainer  center={{ lat: 51.505, lng: -0.09 }} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </div>
    );
}
