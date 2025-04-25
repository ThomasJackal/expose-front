import React, { useEffect, useState } from "react";
import { Badge, Button, Nav, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProfileOffCanvas({ isConnected, userInfos, disconnect }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        console.log(userInfos)
    }, [show])

    if (isConnected && userInfos != null) {
        return (
            <>
                <div className="text-light">
                    <Button variant="transparent" onClick={handleShow} className="m-0 p-0 ms-auto me-4">
                        <img
                            src={userInfos.image}
                            style={{
                                height: 40,
                                width: 40,
                                borderRadius: 40
                            }}
                            className="m-0"
                        />
                    </Button>
                </div>

                <Offcanvas show={show} onHide={handleClose} placement="end" className="bg-light">
                    <Offcanvas.Header closeButton className="bg-black text-light">
                        <Offcanvas.Title>{userInfos.username}</Offcanvas.Title>
                        <img
                            src={userInfos.image}
                            style={{
                                height: 80,
                                width: 80,
                                borderRadius: 40
                            }}
                            className="ms-auto"
                        />

                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="d-flex flex-column h-100">
                            <Nav.Link
                                as={Link}
                                eventKey='2'
                                to={`/user/?username=${userInfos.username}`}
                                className="hover-danger user-greeting"
                            >
                                <i className='fa fa-user me-2'></i>Profil
                            </Nav.Link>
                            {userInfos.isArtist ?
                                <Nav.Link
                                    as={Link}
                                    eventKey='2'
                                    to={"/create/event"}
                                    className="hover-danger user-greeting"
                                >
                                    <i className='fa fa-calendar-days me-2'></i>Créer un événement
                                </Nav.Link>

                                : null}
                            <Nav.Link
                                as={Link}
                                eventKey='6'
                                onClick={() => { disconnect(); }}
                                className="hover-danger user-greeting mt-auto align-self-end m-2"
                            >
                                <i className='fa fa-unlock me-2'></i>Déconnexion
                            </Nav.Link>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        );
    } else {
        return (
            <Nav.Link as={Link} eventKey='5' to="/authenticate" className="me-5">
                <Button variant="outline-danger">
                    <i className='fa fa-key me-0 me-lg-2'></i>
                    <div className="d-none d-lg-inline">Connexion</div>
                </Button>
            </Nav.Link>

        );
    }
}