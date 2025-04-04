import React, { useContext, useState } from "react";
import { Button, Card, Col, Form, Nav, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { register } from "../../controller/RegisterController";
import { myContext } from "../../..";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

    const navigate = useNavigate();
    const [, setToken] = useContext(myContext);
    const [errors, setErrors] = useState({});

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Un utilisateur normal garde la possibilité de devenir compte artiste même après l'inscription.
        </Tooltip>
    );

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        profilePictureLink: "",
        password: "",
        confirmPassword: "",
        isArtist: false,
        artistInfos: {
            displayed_name: "",
            profession: "",
            accountType: ""
        }
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    function handleArtistChange(e) {
        setFormData({
            ...formData,
            artistInfos: {
                ...formData.artistInfos,
                [e.target.name]: e.target.value
            }
        });
    };

    function handleArtistToggle(e) {
        setFormData({
            ...formData,
            isArtist: e.target.checked
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (!validateForm()) return;

        const jsonOutput = {
            email: formData.email,
            username: formData.username,
            profilePictureLink: formData.profilePictureLink,
            password: formData.password,
            artistInfos: formData.isArtist
                ? {
                    displayed_name: formData.artistInfos.displayed_name,
                    profession: formData.artistInfos.profession,
                    accountType: formData.artistInfos.accountType
                }
                : null
        };

        register(jsonOutput, setToken, navigate);
    };

    function validateForm() {
        let newErrors = {};

        // Vérification des champs obligatoires
        if (!formData.email) newErrors.email = "L'email est requis.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format d'email invalide.";

        if (!formData.username) newErrors.username = "Le nom d'utilisateur est requis.";

        if (!formData.password) newErrors.password = "Le mot de passe est requis.";
        else if (formData.password.length < 6) newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
        }

        // Validation des champs pour un compte artiste
        if (formData.isArtist) {
            if (!formData.artistInfos.displayed_name) newErrors.displayed_name = "Le nom d'artiste est requis.";
            if (!formData.artistInfos.profession) newErrors.profession = "La profession est requise.";
            if (!formData.artistInfos.accountType) newErrors.accountType = "Veuillez choisir un type de compte.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }


    return (
        <Form onSubmit={handleSubmit} className="d-flex justify-content-center mt-5">
            <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title>Nouvel utilisateur</Card.Title>
                    <div>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupLogin">
                            <Form.Label>Nom d'utilisateur</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Login"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                isInvalid={!!errors.username}
                            />
                            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Label>Image de profil (URL)</Form.Label>
                        <Row>
                            <Col xs={8}>
                                <Form.Group className="mb-3" controlId="formGroupImageUrl">
                                    <Form.Control
                                        type="text"
                                        placeholder="Entrez l'URL d'une image"
                                        name="profilePictureLink"
                                        value={formData.profilePictureLink}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                            </Col>
                            <Col xs={4}>
                                {formData.profilePictureLink && (
                                    <div className="text-center mb-3">
                                        <img
                                            src={formData.profilePictureLink}
                                            alt="Aperçu"
                                            style={{
                                                height: 40,
                                                width: 40,
                                                borderRadius: 40
                                            }}
                                        />
                                    </div>
                                )}
                            </Col>
                        </Row>
                        <hr />
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPasswordConfirmation">
                            <Form.Label>Confirmation du mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                isInvalid={!!errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>

                        </Form.Group>


                        <hr />

                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                        >
                            <Form.Group>
                                <Form.Check
                                    type="switch"
                                    label="Créer un compte Artiste ?"
                                    onChange={handleArtistToggle}
                                    checked={formData.isArtist}
                                />
                                <Form.Label><small>Un compte artiste à la possibilité de créer des événements, des galleries et à accès à plus de fonctionnalités.</small></Form.Label>
                            </Form.Group>
                        </OverlayTrigger>

                        {formData.isArtist && (
                            <div className="mt-3">
                                <Form.Group className="mb-3">
                                    <Form.Label>Nom d'Artiste</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nom affiché"
                                        name="displayed_name"
                                        value={formData.artistInfos.displayed_name}
                                        onChange={handleArtistChange}
                                        isInvalid={!!errors.displayed_name}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.displayed_name}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Profession</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Profession"
                                        name="profession"
                                        value={formData.artistInfos.profession}
                                        onChange={handleArtistChange}
                                        isInvalid={!!errors.profession}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.profession}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Type de compte</Form.Label>
                                    <Form.Select
                                        name="accountType"
                                        value={formData.artistInfos.accountType}
                                        onChange={handleArtistChange}
                                        isInvalid={!!errors.accountType}
                                    >
                                        <option value="">Choisissez...</option>
                                        <option value="SINGLE">Artiste Indépendant</option>
                                        <option value="COLLECTIVE">Collectif d'artiste</option>
                                        <option value="INSTITUTION">Institut</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">{errors.accountType}</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        )}
                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <Button variant="dark" type="submit">Valider l'inscription</Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Form>
    );
}