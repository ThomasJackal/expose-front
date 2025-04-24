import React, { useState, useEffect } from "react";
import MovingTitle from "../../utils/MovingTitle.js"; // Assuming this is a custom component
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchBar from "../../SearchBar.js";

export default function HomePage() {
    const [isVisible, setIsVisible] = useState({
        expose: false,
        tagline: false,
        button: false,
        creatorsTitle: false,
        creatorsList: false,
        explorersTitle: false,
        explorersList: false,
    });

    useEffect(() => {
        setTimeout(() => setIsVisible((prev) => ({ ...prev, expose: true })), 100);
        setTimeout(() => setIsVisible((prev) => ({ ...prev, tagline: true })), 600);
        setTimeout(() => setIsVisible((prev) => ({ ...prev, button: true })), 900);
        setTimeout(() => setIsVisible((prev) => ({ ...prev, creatorsTitle: true })), 400);
        setTimeout(() => setIsVisible((prev) => ({ ...prev, creatorsList: true })), 700);
        setTimeout(() => setIsVisible((prev) => ({ ...prev, explorersTitle: true })), 500);
        setTimeout(() => setIsVisible((prev) => ({ ...prev, explorersList: true })), 800);
    }, []);

    const fadeStyle = (visible) => ({
        opacity: visible ? 1 : 0,
        transition: "opacity 1s ease-out",
    });

    const slideUpStyle = (visible) => ({
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 1s ease-out, transform 1s ease-out",
    });

    const backgroundImageStyle = {
        backgroundImage: `url("/pictures/EXPOSE_logo.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "150%",
        backgroundPosition: "top left -50px",
        opacity: "0.08",
        filter: "invert(100%)",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    };

    return (
        <Row className="gx-0" style={{ minHeight: "80vh", overflow: "visible" }}>
            <Col
                md={6}
                className="bg-black text-white p-5 d-flex flex-column"
                style={{ position: "relative", overflow: "visible" }}
            >
                <div style={backgroundImageStyle} />
                <div className="justify-content-start align-items-start">
                    <div
                        style={{
                            ...fadeStyle(isVisible.expose),
                            fontSize: "4em",
                            fontWeight: "900",
                            lineHeight: 0.8
                        }}
                    >
                        <MovingTitle>
                            EX⦁
                            <br />
                            POSE/
                        </MovingTitle>
                    </div>
                    <p
                        style={{
                            ...fadeStyle(isVisible.tagline),
                            opacity: 0.75,
                            transitionDelay: "0.5s"
                        }}
                        className="lead"
                    >
                        L'art. Brut.
                    </p>
                </div>
                <Nav className="align-self-end mt-auto" style={{zIndex:5}}>
                    <Nav.Link as={Link} eventKey='0' to="/register">
                        <Button variant="light">Rejoindre</Button>
                    </Nav.Link>
                </Nav>
            </Col>
            <Col
                md={6}
                className="bg-white p-5 d-flex flex-column justify-content-around"
                style={{ position: "relative" }}
            >
                <div
                    style={{
                        ...slideUpStyle(isVisible.creatorsTitle),
                        fontSize: "1.5em",
                        fontWeight: "bold",
                        transitionDelay: "0.3s",
                    }}
                    className="text-danger"
                >
                    CRÉATEURS
                </div>
                <ul
                    style={{
                        ...slideUpStyle(isVisible.creatorsList),
                        transitionDelay: "0.6s",
                    }}
                    className="list-unstyled text-secondary"
                >
                    <li><i className="fas fa-upload me-2"></i> Créez votre galerie en ligne.</li>
                    <li><i className="fas fa-calendar-plus me-2"></i> Organisez vos événements.</li>
                    <li><i className="fas fa-share-alt me-2"></i> Amplifiez votre voix.</li>
                    <li><i className="fas fa-heart me-2"></i> Recevez le soutien de vos fans.</li>
                </ul>
                <hr />
                <div
                    style={{
                        ...slideUpStyle(isVisible.explorersTitle),
                        fontSize: "1.5em",
                        fontWeight: "bold",
                        transitionDelay: "0.4s",
                    }}
                    className="text-danger"
                >
                    EXPLORATEURS
                </div>
                <ul
                    style={{
                        ...slideUpStyle(isVisible.explorersList),
                        transitionDelay: "0.7s",
                    }}
                    className="list-unstyled text-secondary"
                >
                    <li><i className="fas fa-eye me-2"></i> Découvrez de nouveaux talents.</li>
                    <li><i className="fas fa-map-marker-alt me-2"></i> Trouvez des événements près de vous.</li>
                    <li><i className="fas fa-hand-holding-usd me-2"></i> Soutenez vos artistes préférés.</li>
                </ul>
            </Col>
        </Row>
    );
}