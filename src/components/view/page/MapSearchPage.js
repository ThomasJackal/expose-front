import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Searchbar from "../Searchbar";
import { Badge, Button, Card, Carousel, Col, Container, Nav, Offcanvas, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import FlyToLocation from "../../utils/FlyToLocation";

export default function SearchPage(props) {

    const [details, setDetails] = useState(null);
    const [events, setEvents] = useState([]);
    const [searchPosition, setSearchPosition] = useState({lat:48.866669, lng:2.33333});

    useEffect(() => {
        if (details != null) props.setBackground(details.image)
    }, [details])

    function EventMarker(props) {
        const [position, setPosition] = useState([props.event.latitude, props.event.longitude])

        const map = useMapEvents({
            click() {
                if (details != null) setDetails(null);
            }
        })

        useEffect(() => {
            if (details != null) map.flyTo([details.latitude, details.longitude], map.getZoom())
        }, [details])

        return position === null ? null : (
            <Marker
                position={position}
                eventHandlers={{
                    click: () => {
                        setDetails(props.event)
                    },
                }}
            >
            </Marker>
        )
    }

    function PositionMarker(props) {

        const [draggable, setDraggable] = useState(true)
        const [position, setPosition] = useState(props.position)
        const markerRef = useRef(null)
        const eventHandlers = useMemo(
            () => ({
                dragend() {
                    const marker = markerRef.current
                    if (marker != null) {
                        setPosition(marker.getLatLng())
                    }
                },
            }),
            [],
        )
        const toggleDraggable = useCallback(() => {
            setDraggable((d) => !d)
        }, [])

        const map = useMapEvents({
            locationfound(e) {
                setPosition(e.latlng)
            }
        })

        useEffect(() => {
            if (details == null) map.flyTo(props.position, 13);
            props.setPosition(position);
        }, [position, props.position])

        return (
            <Marker
                draggable={draggable}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}>
            </Marker>
        )
    }

    function buildMarkers() {
        if (events.length == 0) return [];
        else {
            let result = [];
            for (let i = 0; i < events.length; i++) {
                const element = events[i];
                result.push(
                    <EventMarker key={i} event={element} />
                )
            }
            return result;
        }
    }

    function buildEvents() {
        if (events.length == 0) return [];
        else {
            let result = [];
            for (let i = 0; i < events.length; i++) {
                const element = events[i];
                result.push(
                    <Event key={i} event={element} setDetailsFunc={setDetails} />
                )
            }
            return result;
        }
    }

    return (
        <div>
            <div className="flex-column">
                <Container style={{ position: "absolute", top: "4rem", left: 0, right: 0 }} className="p-0">
                    <Row style={{ height: "81vh", }}>
                        <MapContainer
                            style={{
                                height: "100%",
                                zIndex: 0,
                                filter: "drop-shadow(0 0 0.75rem rgba(0,0,0,0.5))",
                            }}
                            center={[48.2276, 2.2137]}
                            zoom={5}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <FlyToLocation/>
                            <PositionMarker position={searchPosition} setPosition={setSearchPosition} />
                            {buildMarkers()}
                        </MapContainer>

                        <Col xs={{ offset: 1, span: 10 }} style={{ position: "absolute", zIndex: 5, top: "1rem" }}>
                            <Searchbar setEvents={setEvents} searchPosition={searchPosition} />
                        </Col>
                    </Row>
                </Container>
                <Col xs={{ offset: 0, span: 12 }} md={{ offset: 0, span: 8 }} style={{ marginTop: "83vh" }} className="justify-content-center">
                    {buildEvents()}
                </Col>
            </div>
            <div style={{ position: "sticky", left: 0, right: 0, bottom: 0, top: 0 }}>
                <Col lg={{ span: 4, offset: 8 }} md={{ span: 6, offset: 6 }} xs={{ span: 10, offset: 2 }} style={{ zIndex: 4, position: "absolute", top:"-15rem" }} className="sticky-top">
                    <Details event={details} />
                </Col>
            </div>
        </div>
    );
}

function Event(props) {

    return (
        <Button
            className="p-0 border-0 m-1" style={{ width: '15rem' }}
            onClick={() => props.setDetailsFunc(props.event)}
        >
            <Card>
                <Card.Img variant="top" src={props.event.image} />
                <Card.Body>
                    <Card.Title>{props.event.name}</Card.Title>
                    <div>
                        {props.event.description}
                        <div className="w-100 mt-2">
                            <Badge bg="success">{`${props.event.distance}km`}</Badge>
                            <Badge bg="warning">{props.event.eventType}</Badge>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Button>
    );
}

function Details(props) {

    if (props.event == null) return (<></>);

    function getArtistsParticipationView(artistParticipations) {

        let result = [];
        for (let i = 0; i < artistParticipations.length; i++) {
            const element = artistParticipations[i];
            result.push(<div key={i}>{element.artist_displayed_name}</div>);
        }
        return result;
    }

    return (
        <div style={{ filter: 'drop-shadow(0 0 0.75rem rgba(255, 255, 255, 0.5))' }}>
            <Carousel slide={false} interval={null}>
                <Carousel.Item>
                    <img className="w-100" style={{ height: "30vh", borderRadius: "10px" }} src={props.event.image}></img>
                    <Carousel.Caption>
                        <h3>{props.event.name}</h3>
                        <p>{props.event.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="w-100" style={{ height: "30vh", borderRadius: "10px" }} src={props.event.image}></img>
                    <Carousel.Caption>
                        <h3>{getArtistsParticipationView(props.event.featuredArtists)}</h3>
                        <p>{`du ${props.event.start} au ${props.event.end}`}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div style={{ position: "absolute", bottom: "1rem", left: "-6rem" }}>
                <RightCol event={props.event} />
            </div>
            <div className="d-flex flex-row float-center" style={{ position: "absolute", top: "-3rem", right: "0rem" }}>
                <h5 className="pt-3">{`${props.event.distance} km(s)`}</h5>
                <Nav>
                    <Nav.Link as={Link} eventKey='1' to={`/event/?id=${props.event.id}`}>
                        <Button>Voir les détails</Button>
                    </Nav.Link>
                </Nav>
            </div>
        </div>
    );

    function RightCol(props) {

        function getTagBadges() {
            if (props.event.tags.length == 0) return [];
            else {
                let result = [<br key={-1} />];
                for (let i = 0; i < props.event.tags.length; i++) {
                    const element = props.event.tags[i];
                    result.push(<Badge className="my-1" key={i} bg="secondary">{element}</Badge>)
                }
                return result;
            }
        }

        return (
            <div className="text-dark d-flex flex-column-reverse mt-auto">
                <Badge bg="warning">{props.event.eventType}</Badge>
                {getTagBadges()}
            </div>
        );
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

/*
        <>
        <Card>
            <Card.Body>

                <Row>
                    <Col xs={7}>
                        <h4>{props.event.name}</h4>
                        <h6>{props.event.description}</h6>
                        <hr />
                        <h6>faire une requête à l'api pour avoir l'adresse</h6>
                        <h5>{`du ${props.event.start} au ${props.event.end}`}</h5>
                    </Col>
                    <Col xs={5}>
                        <h5>{getArtistsParticipationView(props.event.featuredArtists)}</h5>
                    </Col>
                </Row>
            </Card.Body>
            <Nav>
                <Nav.Link as={Link} eventKey='1' to={`/event/?id=${props.event.id}`}>
                    <Button>Voir les détails</Button>
                </Nav.Link>
            </Nav>
        </Card>
        <div style={{ position: "absolute", bottom: "1rem", left: "-5rem" }}>
            <RightCol event={props.event} />
        </div>
    </>

    */