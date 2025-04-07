import React, { useContext } from "react";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { myContext } from "../..";

export default function Headerbar() {

    const [token, setToken] = useContext(myContext);

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
        return token != null;
    }

    function disconnect() {
        setToken(null);
    }

    return (
        <Navbar
            className='p-0 sticky-top'
            collapseOnSelect="true"
            bg='black'
            variant='dark'
            sticky='top'
            style={{
                backgroundImage: `url("/pictures/blank-grained-and-scratched-film-strip-texture-background-with-heavy-grain-dust-and-a-light-leak-real-lens-flare-shot-in-studio-over-black-background-free-photo.jpg")`,
                width: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: 'drop-shadow(0 0 0.75rem black)',
                zIndex: 100
            }}
        >
            <Container>
                <Nav>
                    <Nav.Link as={Link} eventKey='0' to="/home">
                        <Navbar.Brand>
                            <img className="ms-5" style={{ height: "2rem" }} src="/pictures/logo.svg"></img>
                            <label className="text-black ms-1 d-none d-lg-inline" style={{ fontFamily: getFont() }}>Art Connect</label>
                        </Navbar.Brand>
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} eventKey='1' to="/home">
                        <i className='fa fa-home me-2'></i>
                        <div className="d-none d-md-inline">Accueil</div>
                    </Nav.Link>
                    <Nav.Link as={Link} eventKey='2' to="/login" hidden={!isConnected()}>
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
            <Button variant="transparent" className="m-0 p-0 ms-auto me-4">
                <i className='fa fa-bell mx-1 text-light'></i>
                <Badge bg="danger">1</Badge>
            </Button>

        </Navbar>
    );
}