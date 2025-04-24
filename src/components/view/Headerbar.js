import React, { useContext, useEffect, useState } from "react";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { myContext } from "../..";
import { getUserInfos_Token } from "../../utils/identificationUtils";
import { Image } from 'react-bootstrap';
import SearchBar from "../SearchBar";
import ProfileOffCanvas from "../ProfileOffcanvas";

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

    function getEmoji() {
        const emoji = [
            "⸜(｡˃ ᵕ ˂ )⸝♡",
            "♡",
            "(*ᴗ͈ˬᴗ͈)ꕤ*.ﾟ",
            "ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧",
            "(˶˃ ᵕ ˂˶)",
            "°❀⋆.ೃ࿔*:･",
            "₍^. .^₎⟆",
            "(๑ᵔ⤙ᵔ๑)",
            "(╥﹏╥)",
            "૮₍ ´• ˕ •` ₎ა",
            "(っ˘з(˘⌣˘ )",
            "꒰ঌ( ˶'ᵕ'˶)໒꒱",
            "(｡•ᴗ•｡)♡",
            "☆*: .｡. o(≧▽≦)o .｡.:*☆",
            "(๑˃̵ᴗ˂̵)ﻭ",
            "(≧◡≦) ♡",
            "(⌯͒• ɪ •⌯͒)",
            "ฅ^•ﻌ•^ฅ",
            "(ᐢ⸝⸝•ᴗ•⸝⸝ᐢ)"
        ];
        return emoji[Math.floor(Math.random() * emoji.length)];
    }

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
            collapseOnSelect={true}
            bg='light'
            variant='light'
            sticky='top'
            style={{
                width: "100%",
                filter: 'drop-shadow(0 0 0.75rem black)',
                zIndex: 100,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <Container>
                <Nav className="me-auto">
                    <Nav.Link as={Link} eventKey='0' to="/home" className="hover-danger">
                        <i className='fa fa-home fa-lg'>
                            <label className="text-black" style={{ fontFamily: getFont(), fontSize: "1.5rem" }}>
                                . EX⦁POSE/
                            </label>
                            <small className="text-danger mt-2">{" " + getEmoji()}</small>
                        </i>
                    </Nav.Link>
                </Nav>

                <div
                    className="mx-auto"
                    style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-65%)'
                    }}
                >
                    <Nav>
                        <Nav.Link as={Link} eventKey='0' to="/home">
                            <img
                                className="ms-5 expose-title"
                                style={{ height: "5rem", marginTop: "-2.5rem", marginBottom: "-2rem" }}
                                src="/pictures/EXPOSE_logo.png"
                                alt="Logo"
                            />
                        </Nav.Link>
                    </Nav>
                </div>

                <Nav className="ms-auto">
                    <Nav.Link as={Link} eventKey='1' to="/search" className="hover-danger user-greeting">
                        <i className="fa-solid fa-magnifying-glass me-2"></i>
                        <div className="d-none d-lg-inline">Rechercher</div>
                    </Nav.Link>
                </Nav>
            </Container>
            <ProfileOffCanvas isConnected={isConnected()} userInfos={userInfos} disconnect={disconnect} />
        </Navbar>
    );
}