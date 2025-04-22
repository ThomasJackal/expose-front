import React, { useContext, useEffect, useState } from "react";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { myContext } from "../..";
import { getUserInfos_Token } from "../../utils/identificationUtils";

export default function Headerbar() {

    const [token, setToken] = useContext(myContext);
    const [userInfos, setUserInfos] = useState(null);

    async function fetchUserInfos() {
        if (token == "") {
            if (userInfos != null) setUserInfos(null);
            return;
        }
        if (userInfos != null) return;
        else setUserInfos(await getUserInfos_Token(token));
    }
    fetchUserInfos();

    function getFont() {
        const fonts = [
            "Montserrat Underline",
            "Bytesized",
            "Roboto Mono",
            "Playfair Display",
            "DM Serif Display",
            "Satisfy",
            "Single Day",
            "DM Serif Text",
            "Monsieur La Doulaise",
            "Funnel Sans",
            "Barriecito",
            "Delius",
            "Limelight",
            "UnifrakturCook",
            "Alfa Slab One",
            "Geo",
            "Fleur De Leah",
            "Condiment",
            "Shadows Into Light",
            "Rubik Glitch",
            "Arial",
            "Georgia",
            "Courier New",
            "Times New Roman",
            "Verdana",
            "Trebuchet MS"
        ];
        return fonts[Math.floor(Math.random() * fonts.length)];
    }

    function isConnected() {
        if (token == "" || token == "null") return false;
        return true;
    }

    function disconnect() {
        setToken("");
    }

    return (
        <Navbar
            className='sticky-top mb-4 pb-3 pt-4'
            collapseOnSelect="true"
            bg='light'
            variant='light'
            sticky='top'
            style={{
                width: "100%",
                filter: 'drop-shadow(0 0 0.75rem black)',
                zIndex: 100
            }}
        >
            <Container>
                <Nav>
                    <Nav.Link as={Link} eventKey='0' to="/home">
                        <Navbar.Brand >
                            <img className="ms-5" style={{ height: "3rem", marginTop:"-1.5rem", marginBottom:"-1rem", marginRight:"-0.7rem" }} src="/pictures/EXPOSE_logo.png"></img>
                            <label className="text-black ms-1 d-none d-lg-inline" style={{ fontFamily: getFont(), fontSize:"1.5rem", marginTop:"-1.5rem" }}>EXPOSE</label>
                        </Navbar.Brand>
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} eventKey='0' to="/home">
                        <i className='fa fa-home me-2'></i>
                        <div className="d-none d-md-inline">Accueil</div>
                    </Nav.Link>
                    <Nav.Link as={Link} eventKey='1' to="/search">
                        <i className="fa-solid fa-magnifying-glass me-2"></i>
                        <div className="d-none d-md-inline">Rechercher</div>
                    </Nav.Link>

                    <Nav.Link as={Link} eventKey='2' to={`/user/?username=${userInfos == null ? "" : userInfos.username}`} hidden={!isConnected()}>
                        <i className='fa fa-user me-2'></i>
                        <div className="d-none d-md-inline">Profil</div>
                    </Nav.Link>
                    <Nav.Link as={Link} eventKey='5' to="/authenticate" hidden={isConnected()}>
                        <i className='fa fa-key me-2'></i>
                        <div className="d-none d-md-inline">Connexion</div>
                    </Nav.Link>
                    <Nav.Link as={Link} eventKey='6' hidden={!isConnected()} onClick={() => {
                        disconnect();
                    }}>
                        <i className='fa fa-unlock me-2'></i>
                        <div className="d-none d-md-inline">Déconnexion</div>
                    </Nav.Link>
                </Nav>
            </Container>
            <div className="text-light">
                <div className="d-none d-md-inline">{isConnected() && userInfos != null ? userInfos.username : ""}</div>
                <Button variant="transparent" className="m-0 p-0 ms-auto me-4">
                    <i className='fa fa-bell mx-1 text-dark'></i>
                    <Badge bg="danger">1</Badge>
                </Button>
            </div>
        </Navbar>
    );
}