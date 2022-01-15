import { useFormikContext } from "formik";
import { Coordinate } from "../models";
import {  Map } from "../shared";


interface MapFieldProps {
coordinates: Coordinate[];
latField: string;
lngField: string;
}

export default function MapField(props: MapFieldProps) {
const {values} = useFormikContext<any>();

   const handleMapClick = (coordinates: Coordinate) => {
       values[props.latField] = coordinates.lat;
       values[props.lngField] = coordinates.lng;
   }

    return (
        <Map
        coordinates={props.coordinates}
        handleMapClick={handleMapClick}
        />
    );
}

MapField.defaultProps = {
    coordinates: []
}