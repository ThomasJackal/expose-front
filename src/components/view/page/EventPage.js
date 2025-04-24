import React, { useContext, useEffect, useState } from "react";
import { Badge, Button, Card, Carousel, Col, Form, InputGroup, Modal, Nav, OverlayTrigger, Row, Spinner, Table, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import PayementModal from "../PayementModal";
import { myContext } from "../../..";
import { fetchEvent } from "../../controller/EventController";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { markerEvent } from "../../utils/marker-icons";

export default function EventPage(props) {

    const [articles, setArticles] = useState([]);
    const [event, setEvent] = useState(null);

    const [showAddressDetails, setShowAddressDetails] = useState(false);

    const handleCloseAddressDetails = () => setShowAddressDetails(false);
    const handleShowAddressDetails = () => setShowAddressDetails(true);

    const [showReservationDetails, setShowReservationDetails] = useState(false);

    const handleCloseReservationDetails = () => setShowReservationDetails(false);
    const handleShowReservationDetails = () => setShowReservationDetails(true);

    if (event == null) {

        const urlParams = new URLSearchParams(window.location.search);
        const eventId = urlParams.get('id');
        fetchEvent(eventId, setEvent);

        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    console.log(event)

    if (event != null && event.images.length > 0) props.setBackground(event.images[0]);

    const zoomLevel = 0.001;
    const boundingbox = [
        event.address.latitude + zoomLevel,
        event.address.latitude - zoomLevel,
        event.address.longitude + zoomLevel,
        event.address.longitude - zoomLevel
    ]

    return (
        <Row>
            <Modal show={showAddressDetails} onHide={handleCloseAddressDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Addresse
                        <h6><p><small>Lat:{event.address.latitude}, long:{event.address.longitude}</small></p></h6>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>{event.address.firstLine}</h5>
                    <h5>{`${event.address.city}, ${event.address.postalCode}`}</h5>
                </Modal.Body>
            </Modal>

            <Modal show={showReservationDetails} onHide={handleCloseReservationDetails}>
                <PayementModal articles={articles} />
            </Modal>

            <Col xs={11}>
                <Card className="sticky-top" style={{ top: "20vh", zIndex: 0 }}>
                    {event.images.length==0?<a/>:<Carousel>
                        {getCarouselImage()}
                    </Carousel>}
                    
                    <Card.Body>
                        <Row>
                            <Col xs={12} md={8}>
                                <h4>{event.name}</h4>
                                <h6>{event.description}</h6>
                                <hr />
                                <ProgramationBox />
                            </Col>
                            <Col xs={12} md={4}>
                                <MapContainer
                                    center={{ lat: event.address.latitude, lng: event.address.longitude }}
                                    zoom={16}
                                    style={{ height: "50vh", width: "100%", zIndex: 0 }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <EventMarker />
                                </MapContainer>
                                <div className="float-end">
                                    <Button onClick={handleShowAddressDetails}>Détails d'adresse</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-3">
                                <ReservationBox />
                                <br />
                                <PostsBox />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

            </Col>
            <Col xs={1}>
                <RightCol />
            </Col>
        </Row>
    );

    function EventMarker() {

        return (
            <Marker
                position={{ lat: event.address.latitude, lng: event.address.longitude }}
                icon={markerEvent}
            >
            </Marker>
        )
    }

    function getCarouselImage() {
        if (event.images.length == 0) return [];
        else {
            let result = [];
            for (let i = 0; i < event.images.length; i++) {
                const element = event.images[i];
                result.push(
                    <Carousel.Item key={i}>
                        <img className="w-100" src={element}></img>
                    </Carousel.Item>
                )
            }
            return result;
        }
    }

    function RightCol() {

        function getTagBadges() {
            if (event.tags.length == 0) return [];
            else {
                let result = [<br key={-1} />];
                for (let i = 0; i < event.tags.length; i++) {
                    const element = event.tags[i];
                    result.push(<Badge className="my-1" key={i} bg="secondary">{element}</Badge>)
                }
                return result;

            }
        }

        function getCreator() {
            return <Avatar user={event.artistParticipations[0]} />
        }

        function getArtists() {
            if (event.artistParticipations.length == 1) return [];
            else {
                let result = [<br />];
                for (let i = 1; i < event.artistParticipations.length; i++) {
                    const element = event.artistParticipations[i];
                    result.push(<Avatar key={i} user={element} />)
                }
                return result;
            }
        }

        return (
            <div
                className="text-dark d-flex flex-column"
                style={{
                    filter: 'drop-shadow(0 0 0.75rem rgba(255, 255, 255, 0.5))'
                }}
            >
                <b>Participants:</b>
                {getCreator()}
                {getArtists()}
                <hr className="mt-5" />
                <Badge bg="warning">{event.eventType}</Badge>
                {getTagBadges()}
            </div>
        );

        function Avatar(props) {

            const renderTooltip = (props_tootip) => (
                <Tooltip {...props_tootip}>
                    {props.user.artist_displayed_name}
                    <hr className="m-0" />
                    {props.user.artist_role}
                </Tooltip>
            );

            function getImage() {
                if (props.user.artist != null) {
                    return (
                        <Nav>
                            <Nav.Link as={Link} eventKey='0' to={`/user/?username=${props.user.artist.username}`}>
                                <img src={props.user.artist.profilePicture}
                                    style={{
                                        height: 40,
                                        width: 40,
                                        borderRadius: 40,
                                    }}
                                    className="my-1"
                                />
                            </Nav.Link>
                        </Nav>
                    );

                } else {
                    return (
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            style={{
                                height: 40,
                                width: 40,
                                borderRadius: 40,
                            }}
                            className="my-1"
                        />
                    );
                }
            }

            return (
                <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                >
                    {getImage()}
                </OverlayTrigger>
            );
        }
    }

    function ReservationBox() {
        const [token,] = useContext(myContext);

        if (event.ticketing == null) return (<></>);

        function getRemainingPlaces(element) {
            if (element.max_places > 0) {
                return (
                    <div className={element.max_places < 10 ? "text-danger" : ""}><b>{element.max_places}</b> places restantes</div>
                );
            } else return (
                <></>
            );
        }

        function updateArticles(articleToUpdate, newAmount) {
            const updatedArticles = articles.some(article => article.name === articleToUpdate.name)
                ? articles.map(article =>
                    article.name === articleToUpdate.name
                        ? newAmount > 0 ? { ...article, amount: newAmount } : null
                        : article
                )
                : [
                    ...articles,
                    {
                        name: articleToUpdate.name,
                        price: articleToUpdate.price_per_unit,
                        amount: 1
                    }
                ];

            return updatedArticles.filter(article => article !== null);
        }


        function getTicketTypes() {

            if (event.ticketing.ticketTypes.length == 0) return [];
            else {
                let result = [];
                for (let i = 0; i < event.ticketing.ticketTypes.length; i++) {
                    const element = event.ticketing.ticketTypes[i];
                    result.push(
                        <Form.Group key={i}>
                            <Form.Label>
                                <b>{element.name}</b>: {element.price_per_unit} €/billet
                                <br />
                                <small>{element.description}</small>
                            </Form.Label>
                            <div className="float-end">
                                {getRemainingPlaces(element)}
                                <Form.Control
                                    type="number"
                                    size="sm"
                                    placeholder="0"
                                    style={{ width: "3rem" }}
                                    className="float-end"
                                    value={articles.find(a => a.name == element.name)?.amount || 0}
                                    onChange={e => setArticles(updateArticles(element, e.target.value))}
                                />
                            </div>
                        </Form.Group>
                    )
                    result.push(<hr className="m-1" key={i + 0.5} />)
                }
                return result;
            }
        }

        function renderTooltip(props_tootip) {
            if (token == "" || token == "null") {
                return (<Tooltip {...props_tootip}>
                    Vous devez être connecté pour réserver un billet !
                </Tooltip>);
            } else return (<div></div>);
        }


        return (
            <Card bg="success">
                <Card.Header>Réserver sa place</Card.Header>
                <Card.Body>
                    <Form>
                        {getTicketTypes()}
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                        >
                            <div className="float-end">
                                <Button onClick={handleShowReservationDetails} disabled={token == "" || token == "null" || articles.length == 0}>Réserver ces billets</Button>
                            </div>
                        </OverlayTrigger>
                    </Form>
                </Card.Body>
            </Card>
        );
    }

    function PostsBox() {
        return (
            <Card bg="light">
                <Card.Header>Annonces</Card.Header>
                <Card.Body>
                    à faire...
                </Card.Body>
            </Card>
        );
    }

    function ProgramationBox() {

        function ProgramationTable() {

            const programation = event.programation;

            const formatDate = (dateString, daysToAdd) => {
                const startDate = Date.parse(dateString.replace(/-/g, "/"));
                const newDate = new Date(startDate);
                newDate.setDate(newDate.getDate() + daysToAdd);

                return newDate.toLocaleDateString("fr-FR", {
                    weekday: 'long',
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                });
            };

            function formatHeure(heure) {
                const date = new Date(`1970-01-01T${heure}`);
                return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h');
            }

            const slotsByDate = {};

            programation.slots.forEach(({ label, days_from_start, start_time, end_time }) => {
                const dateKey = formatDate(programation.start_date, days_from_start);

                if (!slotsByDate[dateKey]) {
                    slotsByDate[dateKey] = [<b>Activité(s)</b>];
                }
                slotsByDate[dateKey].push(`${label == "" || label == null ? "" : label + ": "}${formatHeure(start_time)} à ${formatHeure(end_time)}`);
            });


            return (
                <Table responsive striped="columns">
                    <thead>
                        <tr>
                            {Object.keys(slotsByDate).map((date) => (
                                <th key={date}>{date}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {Object.keys(slotsByDate).map((date) => (
                                <td key={date}>
                                    {slotsByDate[date].map((slot, index) => (
                                        <div key={index}>{slot}</div>
                                    ))}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </Table>
            );
        };

        return (
            <Card bg="light" className="w-100">
                <Card.Header>Programation</Card.Header>
                <Card.Body className="p-0 text-center">
                    <ProgramationTable />
                </Card.Body>
            </Card>
        );
    }
}
/*
const event = {
            "id": 1,
            "name": "event 04",
            "description": "description",
            "eventType": "EXPOSITION",
            "programation": {
                "start_date": "2025-04-03",
                "slots": [
                    {
                        "days_from_start": 0,
                        "start_time": "08:38:05",
                        "end_time": "13:38:03"
                    },
                    {
                        "days_from_start": 1,
                        "start_time": "08:38:06",
                        "end_time": "13:38:06"
                    }
                    ,
                    {
                        "days_from_start": 1,
                        "start_time": "14:38:06",
                        "end_time": "19:38:06"
                    }
                ]
            },
            "ticketing": {
                "closing_datetime": null,
                "ticketTypes": [
                    {
                        "name": "tarif normal",
                        "description": "",
                        "max_places": -1,
                        "price_per_unit": 1.0
                    }, {
                        "name": "tarif VIP",
                        "description": "donne un accès avancé",
                        "max_places": 10,
                        "price_per_unit": 2.0
                    }, {
                        "name": "tarif VIP+",
                        "description": "donne un accès avancé encore plus",
                        "max_places": 2,
                        "price_per_unit": 10.0
                    }
                ]
            },
            "artistParticipations": [
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
            "posts": [],
            "followers": [],
            "address": {
                "latitude": 1,
                "longitude": 1,
                "firstLine": "",
                "secondLine": "",
                "postalCode": "",
                "city": ""
            },
            "images": [
                "https://www.textures4photoshop.com/tex/thumbs/film-burn-overlay-free-484.jpg"
            ],
            "tags": [
                "PAINT",
                "MUSICAL"
            ]
        };
        */