import React, { useState } from "react";

import Searchbar from "../Searchbar";
import { Badge, Button, Card, Col, Nav, Offcanvas, OverlayTrigger, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

export default function SearchPage(props) {

    const [details, setDetails] = useState(null);
    const [events, setEvents] = useState([]);
    const [position, setPosition] = useState([51.505, -0.09]);

    function updateDetails(details) {
        setDetails(details);
        props.setBackground(details.image)
    }

    function buildEvents() {
        if (events.length == 0) return [];
        else {
            let result = [];
            for (let i = 0; i < events.length; i++) {
                const element = events[i];
                result.push(
                    <Event key={i} event={element} setDetailsFunc={updateDetails} />
                )
            }
            return result;
        }
    }

    const event1 = {
        id: 1,
        latitude: 1,
        longitude: 1,
        name: "event 01",
        description: "description de l'event",
        start: "01-01-2025",
        end: "01-01-2025",
        featuredArtists: [{ artist_displayed_name: "the artist" }],
        distance: 1,
        eventType: "EXPOSITION",
        tags: ["PHOTOGRAPHIC", "PERFORMANCE"],
        image: "/pictures/preview_09-1-scaled.webp"
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Simple tooltip
        </Tooltip>
    );
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);



    return (
        <>

            <>
                <Button variant="primary" onClick={toggleShow} className="me-2">
                    oui
                </Button>
                <Offcanvas
                    show={show}
                    onHide={handleClose}
                    scroll={true}
                    backdrop={false}
                    placement="end"
                    style={{zIndex:10}}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        Some text as placeholder. In real life you can have the elements you
                        have chosen. Like, text, images, lists, etc.
                    </Offcanvas.Body>
                </Offcanvas>
            </>
            <Col className="mt-2 w-50" xs={{ offset: 1 }} style={{ zIndex: 5, position: "absolute" }}>
                <Searchbar setEvents={setEvents} />
            </Col>
            <MapContainer
                style={{
                    height: "40rem",
                    zIndex: 0,
                    borderRadius: "10px",
                    filter: "drop-shadow(0 0 0.75rem rgba(0,0,0,0.5))",
                    position: "relative"
                }}
                center={[51.505, -0.09]}
                zoom={13}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup className="p-0 m-0">
                        <Details event={event1} />
                    </Popup>
                </Marker>
            </MapContainer>

        </>
    );
}


function Event(props) {

    function getTagBadges() {
        let result = [];


        for (let i = 0; i < props.event.tags.length; i++) {
            const element = props.event.tags[i];
            result.push(<Badge key={i} bg="secondary">{element}</Badge>)
        }
        return result;
    }

    return (
        <Button
            className="p-0 m-0" style={{ width: '15rem' }}
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
                            {getTagBadges()}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Button>
    );
}

function Details(props) {

    if (props.event == null) return (<></>);

    const zoomLevel = 0.001;
    const boundingbox = [
        props.event.latitude + zoomLevel,
        props.event.latitude - zoomLevel,
        props.event.longitude + zoomLevel,
        props.event.longitude - zoomLevel
    ]

    function getArtistsParticipationView(artistParticipations) {

        let result = [];
        for (let i = 0; i < artistParticipations.length; i++) {
            const element = artistParticipations[i];
            result.push(<div key={i}>{element.artist_displayed_name}</div>);
        }
        return result;
    }


    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col xs={8}>
                        <h4>{props.event.name}</h4>
                        <h6>{props.event.description}</h6>
                        <hr />
                        <h6>faire une requête à l'api pour avoir l'adresse</h6>
                        <h5>{`du ${props.event.start} au ${props.event.end}`}</h5>
                    </Col>
                    <Col xs={4}>
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
    );
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
    */