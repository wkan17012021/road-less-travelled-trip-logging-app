// app/components/Map.tsx
import { useEffect, useState } from 'react';
import type { FC } from 'react';

interface Trip {
    id: string;
    title: string;
    latitude: number;
    longitude: number;
    image_url?: string;
    caption?: string;
    description?: string;
}

interface MapProps {
    trips: Trip[];
    onLocationFound: (lat: number, lng: number) => void;
}

let MapContainer: any;
let TileLayer: any;
let Marker: any;
let Popup: any;
let useMapEvents: any;
let L: any;

const LocationMarker = ({ onLocationFound }: { onLocationFound: (lat: number, lng: number) => void }) => {
    const [position, setPosition] = useState<any>(null);

    const map = useMapEvents({
        click() {
            map.locate();
        },
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            onLocationFound(e.latlng.lat, e.latlng.lng);
        },
    });

    return position === null ? null : (
        <Marker position={position}>
            <Popup>Your current location.</Popup>
        </Marker>
    );
};

const Map: FC<MapProps> = ({ trips, onLocationFound }) => {
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
                        iconRetinaUrl: '/icon-flag.png',
                        iconUrl: '/icon-flag.png',
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

    return (
        <div className="w-full h-[80vh] py-4">
            <MapContainer
                center={{ lat: 51.505, lng: -0.09 }}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {trips.map((trip) => (
                    <Marker key={trip.id} position={[trip.latitude, trip.longitude]}>
                        <Popup>
                            <div style={{ maxWidth: 220 }}>
                                {trip.image_url && (
                                    <img
                                        src={trip.image_url}
                                        alt={trip.title}
                                        style={{ maxWidth: "200px", maxHeight: "150px", marginBottom: 8 }}
                                    />
                                )}
                                <strong>{trip.title}</strong>
                                {trip.caption && <div><em>{trip.caption}</em></div>}
                                {trip.description && <div>{trip.description}</div>}
                            </div>
                        </Popup>
                    </Marker>
                ))}
                <LocationMarker onLocationFound={onLocationFound} />
            </MapContainer>
        </div>
    );
};

export default Map;
