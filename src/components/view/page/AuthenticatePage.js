import React, { useContext, useState } from "react";
import { Button, Card, Form, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../../..";
import { authenticate } from "../../controller/AuthenticateController";

export default function LoginPage() {

    const navigate = useNavigate();
    const [, setToken] = useContext(myContext);

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });


    function handleSubmit(e) {
        e.preventDefault();
        const jsonOutput = {
            username: formData.username,
            password: formData.password
        };

        authenticate(jsonOutput, setToken, navigate);
    };

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="d-flex justify-content-center mt-5">
            <Card style={{ width: '25rem' }}>
                <Card.Header as="h3" className="bg-black text-light">Connexion</Card.Header>
                <Card.Body>
                    <div>
                        <Form.Group className="mb-3" controlId="formGroupLogin">
                            <Form.Label>Nom d'utilisateur</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Login"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <Button variant="dark" type="submit">Se connecter</Button>
                        <Nav>
                            <Nav.Link as={Link} eventKey='1' to="/register">
                                <small className="link-danger">Créer un nouveau compte</small>
                            </Nav.Link>
                        </Nav>
                    </div>
                </Card.Body>
            </Card>
        </Form>
    );
}