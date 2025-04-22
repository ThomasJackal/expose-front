import React, { useState } from "react";

import Searchbar from "../../Searchbar";
import { Badge, Button, Card, Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SearchPage(props) {

    const [details, setDetails] = useState(null);
    const [events, setEvents] = useState([]);

    function updateDetails(details) {
        setDetails(details);
        props.setBackground(details.image)
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

    return (
        <>
            <Row className="mb-3" xs={{ span: 10, offset: 1 }} md={{ span: 6, offset: 0 }}
                style={{
                    position: "sticky",
                    top: "1rem",
                    zIndex: 10
                }}>
                <Searchbar setEvents={setEvents} />
            </Row>
            <Row>
                <Col xs={{ span: 12, offset: 0 }} md={{ span: 5, offset: 0 }} className="justify-content-center">
                    {buildEvents()}
                </Col>
                <Col xs={{ span: 12, offset: 0 }} md={{ span: 7, offset: 0 }} >
                    <Details event={details} />
                </Col>
                <hr className="mt-2 mb-5" />
            </Row>
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
            <iframe className="w-100" style={{ height: "65vh" }} src={`https://www.openstreetmap.org/export/embed.html?bbox=${boundingbox[2]}%2C${boundingbox[0]}%2C${boundingbox[3]}%2C${boundingbox[1]}&amp;layer=mapnik`}></iframe>
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
{
    latitude: long
    longitude: long
    name: string
    description: string
    start: date
    end: date
    featuredArtists: [{}]
    distance: long
    eventType: string
    tags: []
    image: string
}
*/