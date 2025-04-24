import React, { useEffect, useState } from "react";
import { Badge, Button, Nav, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProfileOffCanvas({ isConnected, userInfos, disconnect }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    <Offcanvas.Header closeButton className="bg-dark text-light">
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
                        <Nav.Link
                            as={Link}
                            eventKey='2'
                            to={`/user/?username=${isConnected && userInfos != null ? userInfos.username : ""}`}
                            className="hover-danger user-greeting"
                        >
                            <i className='fa fa-user me-2'></i>
                            <div className="d-none d-lg-inline">Profil</div>
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            eventKey='2'
                            to={"/create/event"}
                            className="hover-danger user-greeting"
                        >
                            <i className='fa fa-user me-2'></i>
                            <div className="d-none d-lg-inline">Créer un événement</div>
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            eventKey='6'
                            onClick={() => { disconnect(); }}
                            className="hover-danger user-greeting"
                        >
                            <i className='fa fa-unlock me-2'></i>
                            <div className="d-none d-lg-inline">Déconnexion</div>
                        </Nav.Link>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        );
    } else {
        return (
            <Nav.Link as={Link} eventKey='5' to="/authenticate" className="hover-danger user-greeting me-5">
                <i className='fa fa-key me-2'></i>
                <div className="d-none d-lg-inline">Connexion</div>
            </Nav.Link>

        );
    }
}