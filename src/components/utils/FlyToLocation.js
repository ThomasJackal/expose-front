import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function FlyToLocation() {
    const map = useMap();

    useEffect(() => {
        map.locate();
    }, [map]);

    return null;
}