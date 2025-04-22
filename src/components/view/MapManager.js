import React, { useEffect, useMemo, useRef, useState } from "react"
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { fetchAddress } from "../controller/MapController";
import FlyToLocation from "../utils/FlyToLocation";

export default function MapManager({ onAddressChange, errors }) {

    const center = { lat: 48.866669, lng: 2.33333 }
    const [position, setPosition] = useState(center)
    const [inputField_text, setInputField_text] = useState("")

    const [feedback, setFeedback] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        onAddressChange(position)
    }, [position, setPosition]);

    async function handleSearch() {
        setLoading(true);
        setFeedback({});
        const address = await fetchAddress(inputField_text);
        if (address.length > 0) {
            setFeedback({ valid: "Adresse valide" })
            setPosition({ lat: address[0].lat, lng: address[0].lon })
        } else {
            setFeedback({ invalid: "Adresse Invalide" })
        }
        setLoading(false);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter' && inputField_text) {
            handleSearch();
        }
    };

    return (
        <>
            <h5>Localisation</h5>
            <InputGroup className="mb-3">
                <Form.Control
                    type="text"
                    value={inputField_text}
                    onChange={(e) => setInputField_text(e.target.value)}
                    isInvalid={!!feedback.invalid}
                    isValid={!!feedback.valid}
                    onKeyDown={handleKeyDown}
                />
                <InputGroup.Text className="p-0">
                    <Button onClick={async () => handleSearch()} disabled={loading}>
                        {loading ?
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> :
                            <i className="fa-solid fa-magnifying-glass"></i>
                        }
                    </Button>
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">{feedback.invalid}</Form.Control.Feedback>
                <Form.Control.Feedback type="valid">{feedback.valid}</Form.Control.Feedback>
            </InputGroup>
            <div style={{ position: "relative" }}>
                <MapContainer
                    center={center}
                    zoom={13}
                    style={{ height: '300px', width: '100%', marginBottom: '15px', zIndex: 0 }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FlyToLocation />
                    <DraggableMarker position={position} setPosition={setPosition} />
                </MapContainer>
                <h6
                    className="m-1 text-light"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        zIndex: 5,
                        textShadow: "0 0 0.1rem black,0 0 0.2rem black,0 0 0.3rem black"

                    }}
                >
                    <small>lat: {position.lat}<br />lng: {position.lng}</small>
                </h6>
            </div>
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
