import React, { useEffect, useMemo, useRef, useState } from "react"
import { Button, Form, InputGroup } from "react-bootstrap";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { fetchAddress } from "../controller/MapController";

export default function MapManager({ onAddressChange, errors }) {

    const center = { lat: 48.866669, lng: 2.33333 }
    const [position, setPosition] = useState(center)
    const [inputField_text, setInputField_text] = useState("")

    useEffect(() => {
        onAddressChange(position)
    }, [position, setPosition]);

    async function handleSearch() {
        const address = await fetchAddress(inputField_text);
        setPosition({ lat: address[0].lat, lng: address[0].lon })
    }

    return (
        <>
            <h5>Localisation</h5>
            <InputGroup className="mb-3">
                <Form.Control
                    type="text"
                    value={inputField_text}
                    onChange={(e) => setInputField_text(e.target.value)}
                />
                <InputGroup.Text className="p-0">
                    <Button onClick={async () => handleSearch("5 boulevard de la pépinière")} ><i className="fa-solid fa-magnifying-glass"></i></Button>
                </InputGroup.Text>
            </InputGroup>
            <MapContainer
                center={center}
                zoom={13}
                style={{ height: '300px', width: '100%', marginBottom: '15px' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FlyToLocation />
                <DraggableMarker position={position} setPosition={setPosition} />
            </MapContainer>
            <h6><small>lat: {position.lat}<br />lng: {position.lng}</small></h6>
        </>
    );

    function DraggableMarker(props) {
        const markerRef = useRef(null)

        const map = useMapEvents({
            locationfound(e) {
                setPosition(e.latlng)
            }
        })

        useEffect(() => {
            map.flyTo(props.position, map.getZoom())
        }, [props.position])

        const eventHandlers = useMemo(
            () => ({
                dragend() {
                    const marker = markerRef.current
                    if (marker != null) {
                        props.setPosition(marker.getLatLng())
                    }
                },
            }),
            [],
        )

        return (
            <Marker
                draggable={true}
                eventHandlers={eventHandlers}
                position={props.position}
                ref={markerRef}>
            </Marker>
        )
    }
}

export function FlyToLocation() {
    const map = useMap();

    useEffect(() => {
        map.locate();
    }, [map]);

    return null;
}