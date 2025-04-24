import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Searchbar from "../Searchbar";
import { Badge, Button, Card, Carousel, Col, Container, Form, InputGroup, Modal, Nav, Offcanvas, OverlayTrigger, Row, Spinner, Table, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import FlyToLocation from "../../utils/FlyToLocation";
import { fetchAddress } from "../../controller/MapController";
import { search } from "../../controller/SearchController";
import { markerEvent, markerEventSelected, markerPosition } from "../../utils/marker-icons";
import SearchBar from "../../SearchBar";

export default function SearchPage(props) {

    const urlParams = new URLSearchParams(window.location.search);
    const urlLatLng = { lat: urlParams.get('lat'), lng: urlParams.get('lng') };


    const center = { lat: 48.866669, lng: 2.33333 }
    const [position, setPosition] = useState(center)
    const [inputField_text, setInputField_text] = useState("")

    const [feedback, setFeedback] = useState({});
    const [loading, setLoading] = useState(false);

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [hoveredEventId, setHoveredEventId] = useState(null);
    const [searchParams, setSearchParams] = useState({
        query: "",
        distance: "",
        eventType: null,
        tags: []
    });


    const handleAddressChange = useCallback((addressData) => {
        setPosition(addressData);
    }, []);

    useEffect(() => {
        handleAddressChange(position)
        search(searchParams, setEvents, position);
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

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedEvent(null);
    };

    const handleMouseEnter = (eventId) => {
        setHoveredEventId(eventId);
    };

    const handleMouseLeave = () => {
        setHoveredEventId(null);
    };

    return (
        <Row className="p-0 w-100" style={{
            position: "absolute",
            top: "5rem",
            left: 0,
        }}

            ref={(node) => {
                if (node) {
                    node.style.setProperty("max-width", "100vw", "important");
                }
            }}
        >
            <Col xs={4} md={6} lg={8} className="px-md-5 my-3" >
                <Row className="bg-black py-5 px-0 px-md-5">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            value={inputField_text}
                            onChange={(e) => setInputField_text(e.target.value)}
                            isInvalid={!!feedback.invalid}
                            isValid={!!feedback.valid}
                            onKeyDown={handleKeyDown}
                            placeholder="Rechercher..."
                        />
                        <Button onClick={async () => handleSearch()} disabled={loading} variant="danger">
                            {loading ?
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> :
                                <i className="fa-solid fa-magnifying-glass"></i>
                            }
                        </Button>
                    </InputGroup>
                </Row>

                <Row className="bg-white">
                    <Row style={{
                        maxHeight: "calc(100vh - 20.9rem)",
                        overflowY: "auto",
                        overflowX: "hidden"
                    }}
                    >
                        {events.length == 0 ?
                            <div className="text-center">Aucuns événement n'a été trouvé :(</div>
                            : events.map((event, i) => (
                                <Col xs={12} md={6} xl={3} key={i}>
                                    <Event
                                        event={event}
                                        onClick={handleEventClick}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    />
                                </Col>
                            ))}
                    </Row>
                </Row>
            </Col>

            <Col xs={8} md={6} lg={4} className="p-0" style={{ position: "absolute", right: "-10px" }}>
                <MapContainer
                    center={center}
                    zoom={13}
                    style={{ height: "calc(100vh - 11.5rem)", width: "100%", zIndex: 0 }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FlyToLocation />
                    <DraggableMarker position={position} setPosition={setPosition} />
                    {events.map((event, i) => (
                        <EventMarker
                            key={i}
                            event={event}
                            onClick={handleEventClick}
                            isHovered={hoveredEventId === event.id}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            userPosition={position}
                        />
                    ))}

                </MapContainer>
                <h6
                    className="m-1 text-light"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        textShadow: "0 0 0.1rem black,0 0 0.2rem black,0 0 0.3rem black"
                    }}
                >
                    <small>lat: {position.lat}<br />lng: {position.lng}</small>
                </h6>
            </Col>

            <EventModal show={showModal} event={selectedEvent} onClose={handleCloseModal} />
        </Row>
    );

}

function DraggableMarker(props) {

    const markerRef = useRef(null)

    const map = useMapEvents({
        locationfound(e) {
            props.setPosition(e.latlng)
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
            ref={markerRef}
            icon={markerPosition}
        >
        </Marker>
    )
}

function EventMarker(props) {
    const [position, setPosition] = useState([props.event.latitude, props.event.longitude])

    const map = useMap();

    useEffect(() => {

        if (props.isHovered) map.flyTo(position, map.getZoom())

    }, [props.isHovered])

    return position === null ? null : (
        <Marker
            position={position}
            icon={props.isHovered ? markerEventSelected : markerEvent}
            eventHandlers={{
                click: () => {
                    props.onClick(props.event);
                },
                mouseover: (event) => {
                    props.onMouseEnter(props.event.id);
                },
                mouseout: (event) => {
                    props.onMouseLeave();
                }
            }}
        >
        </Marker>
    )
}

function Event(props) {

    return (
        <Button
            variant="transparent"
            className="m-0 p-0 w-100"
            onClick={() => props.onClick(props.event)}
            onMouseEnter={() => props.onMouseEnter(props.event.id)}
            onMouseLeave={props.onMouseLeave}
        >
            <Card className="my-2 bg-dark text-light">
                <div>
                    {props.event.name}
                    <div className="w-100 mt-2">
                        <Badge bg="success">{`${Math.floor(props.event.distance)} km`}</Badge>
                        <Badge bg="warning">{props.event.eventType}</Badge>
                    </div>
                </div>
                <img className="w-100" src={props.event.image} />
            </Card>
        </Button>
    );
}

function EventModal({ show, event, onClose }) {
    if (!event) {
        return null;
    }

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{event.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {event.image && <img className="w-100 mb-3" style={{ maxHeight: '15rem', objectFit: 'cover' }} src={event.image} alt={event.name} />}
                <Row>
                    <Col xs={6}>
                        <p>{event.description}</p>
                        <h5>{`du ${event.start} au ${event.end}`}</h5>
                        {event.featuredArtists && event.featuredArtists.length > 0 && (
                            <div>
                                <strong>Artists:</strong>
                                <ul>
                                    {event.featuredArtists.map((artist, index) => (
                                        <li key={index}>{artist.artist_displayed_name} ({artist.artist_role})</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </Col>
                    <Col xs={6}>
                        <MapContainer
                            center={{ lat: event.latitude, lng: event.longitude }}
                            zoom={16}
                            style={{ height: "50vh", width: "100%", zIndex: 0 }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <ModalMarker />

                        </MapContainer>
                    </Col>
                </Row>
                {event.tags && event.tags.length > 0 && (
                    <div>
                        <strong>Tags:</strong>
                        {event.tags.map((tag, index) => (
                            <Badge key={index} className="me-1 bg-info">{tag}</Badge>
                        ))}
                    </div>
                )}
                <Badge className="mt-2 bg-success">{`${event.distance}km`}</Badge>
                <Badge className="ms-2 mt-2 bg-warning">{event.eventType}</Badge>
            </Modal.Body>
            <Modal.Footer>
                <Nav.Link as={Link} eventKey='1' to={`/event/?id=${event.id}`}>
                    <Button>Voir les détails</Button>
                </Nav.Link>
            </Modal.Footer>
        </Modal>
    );

    function ModalMarker() {

        return (
            <Marker
                position={{ lat: event.latitude, lng: event.longitude }}
                icon={markerEvent}
            >
            </Marker>
        )
    }
}
/*
    const event2 = {
        id: 2,
        latitude: 2,
        longitude: 2,
        name: "event 02",
        description: "description de l'event",
        start: "01-01-2025",
        end: "01-01-2025",
        featuredArtists: [{ artist_displayed_name: "the artist" }],
        distance: 2,
        eventType: "STUDIO_OPENING",
        tags: ["PAINT"],
        image: "/pictures/o_1hosre7p91k88h151t1kaj3mb17.avif"
    };

    const event3 = {
        id: 3,
        latitude: 3,
        longitude: 3,
        name: "event 03",
        description: "description de l'event",
        start: "01-01-2025",
        end: "01-01-2025",
        featuredArtists: [{ artist_displayed_name: "the artist" }],
        distance: 3,
        eventType: "AUCTION",
        tags: ["PAINT", "SCULPTURE", "VISUAL_ART"],
        image: "/pictures/preview_11.jpg"
    };

        const event1 = {
        "id": 1,
        "latitude": 1,
        "longitude": 1,
        "name": "event 04",
        "description": "description",
        "start": "2025-04-03",
        "end": "2025-04-04",
        "featuredArtists": [
            {
                "artist_displayed_name": "nom d'artiste stylé",
                "artist_role": "creator",
                "artist": {
                    "id": 1,
                    "username": "a",
                    "profilePicture": "https://avatars.githubusercontent.com/u/57241288?v=4"
                }
            }
        ],
        "distance": 1,
        "eventType": "EXPOSITION",
        "tags": [
            "PAINT",
            "MUSICAL"
        ],
        "image": "https://www.textures4photoshop.com/tex/thumbs/film-burn-overlay-free-484.jpg"
    };
    */
