import React, { useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Headerbar from "./view/Headerbar";
import HomePage from "./view/page/HomePage";
import AuthenticatePage from "./view/page/AuthenticatePage";
import RegisterPage from "./view/page/RegisterPage";
import EventPage from "./view/page/EventPage";
import ArtistPage from "./view/page/ArtistPage";
import MapSearchPage from "./view/page/MapSearchPage";
import EventCreationPage from "./view/page/EventCreationPage";

import { myContext } from "..";

export default function App() {

    const [background, setBackground] = useState("/pictures/background.jpg");
    const [token, setToken] = useState(sessionStorage.getItem("token"));

    useEffect(() => {
        sessionStorage.setItem("token", token)
    }, []);

    var backgroundStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("${background}")`,
        filter: "blur(10vh) invert(100%) brightness(1.5)",
        zIndex: -1
    };

    return (
        <myContext.Provider value={[token, setToken]}>
            <BrowserRouter style={{ position: "relative", height: "100vh" }}>
                <div style={backgroundStyle}></div>
                <div className="d-flex flex-column min-vh-100">
                    <div className="mb-4"><Headerbar /></div>
                    <article className="flex-grow-1">
                        <Container>
                            <Routes>
                                <Route exact path="/" element={<HomePage />} />
                                <Route exact path="/home" element={<HomePage />} />
                                <Route exact path="/search" element={<MapSearchPage setBackground={setBackground} />} />
                                <Route exact path="/authenticate" element={<AuthenticatePage />} />
                                <Route exact path="/register" element={<RegisterPage />} />
                                <Route exact path="/event/*" element={<EventPage setBackground={setBackground} />} />
                                <Route exact path="/artist/*" element={<ArtistPage setBackground={setBackground} />} />
                                <Route exact path="/create/event" element={<EventCreationPage/>} />
                            </Routes>
                        </Container>
                    </article>
                    <footer
                        className="bg-light text-dark text-end p-3 mt-4"
                        style={{ filter: 'drop-shadow(0 0 0.75rem rgba(0,0,0,0.15))' }}
                    >
                        ArtConnect© - 2025
                    </footer>
                </div>
            </BrowserRouter>
        </myContext.Provider>
    );
}