import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import  'leaflet/dist/leaflet.css';
import L from "leaflet";
import { Coordinate } from "../models";
import { useState } from "react";

interface MapProps {
    height: string;
    coordinates: Coordinate[]
    handleMapClick(coordinates: Coordinate): void;
}

let defaultIcon = L.icon({
iconUrl: icon,
shadowUrl: iconShadow,
iconAnchor: [16, 37]
}) 

L.Marker.prototype.options.icon = defaultIcon;

export default function Map(props: MapProps){

    const [coordinates, setCoordinates] = useState<Coordinate[]>(props.coordinates);

    return (
        <MapContainer
        center={[55.380756, 13.135399]}
        zoom={14}
        style={{height: props.height}}
        >
        <TileLayer
          attribution={'React Movies'}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClick  setCoordinates={coordinates => {
            setCoordinates([coordinates]);
            props.handleMapClick(coordinates);
        }}/>
        {coordinates.map((item, index) => {
            return (
                <Marker key={index} position={[item.lat, item.lng]} />
            )
        })}
      </MapContainer>
    )
}

Map.defaultProps = {
height: '500px'
}

function MapClick(props: MapClickProps) {

    useMapEvent('click', eventArgs => {
        props.setCoordinates({lat: eventArgs.latlng.lat, lng: eventArgs.latlng.lng});
    } )
    return null;
}

interface MapClickProps {
    setCoordinates(coordinates: Coordinate): void;
}