import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Form, Row, Col, Table } from "react-bootstrap";
import ProgrammationManager from "../ProgrammationManager";
import TicketingManager from "../TicketingManager";

export default function EventForm() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        programation: {
            start_date: "",
            slots: [{ days_from_start: 0, start_time: "", end_time: "" }],
        },
        eventType: "EXPOSITION",
        billetterie: {
            enabled: false,
            closing_datetime: "",
            ticketTypes: [{ name: "", description: "", max_places: -1, price_per_unit: 1 }],
        },
        address: {
            latitude: 0,
            longitude: 0,
        },
        tags: [],
        images: [{ imageLink: "" }],
        owner_artist_role: "creator",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNestedChange = (category, field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [category]: {
                ...prevData[category],
                [field]: value,
            },
        }));
    };

    const handleProgrammationChange = useCallback((programmationData) => {
        setFormData(prevData => ({ ...prevData, programmation: programmationData }));
    }, []);

    const handleTicketingChange = useCallback((ticketingData) => {
        setFormData((prevData) => ({
            ...prevData,
            billetterie: ticketingData,
        }));
    }, []);

    const handleArrayChange = (category, index, field, value) => {
        setFormData((prevData) => {
            const newArray = [...prevData[category]];
            newArray[index][field] = value;
            return {
                ...prevData,
                [category]: newArray,
            };
        });
    };

    const addArrayElement = (category) => {
        setFormData((prevData) => {
            const newArray = [...prevData[category]];
            if (category === "images") {
                newArray.push({ imageLink: "" });
            }
            return {
                ...prevData,
                [category]: newArray,
            };
        });
    };

    const handleBilletterieToggle = () => {
        setFormData((prevData) => ({
            ...prevData,
            billetterie: {
                ...prevData.billetterie,
                enabled: !prevData.billetterie.enabled,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const jsonOutput = {
            name: formData.name,
            description: formData.description,
            programation: formData.programation,
            eventType: formData.eventType,
            billetterie: formData.billetterie.enabled ? formData.billetterie : null,
            address: formData.address,
            tags: formData.tags,
            images: formData.images,
            owner_artist_role: formData.owner_artist_role,
        };

        console.log(JSON.stringify(jsonOutput, null, 2));
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.name) newErrors.name = "Le nom de l'événement est requis.";
        if (!formData.description) newErrors.description = "La description est requise.";
        if (!formData.programation.start_date) newErrors.start_date = "La date de début est requise.";

        formData.programation.slots.forEach((slot, index) => {
            if (!slot.start_time) newErrors[`start_time_${index}`] = `L'heure de début du slot ${index + 1} est requise.`;
            if (!slot.end_time) newErrors[`end_time_${index}`] = `L'heure de fin du slot ${index + 1} est requise.`;
        });

        if (formData.billetterie.enabled) {
            if (!formData.billetterie.closing_datetime) newErrors.closing_datetime = "La date de clôture de la billetterie est requise.";

            if (!formData.billetterie.ticketTypes || formData.billetterie.ticketTypes.length === 0) {
                newErrors.ticketTypes = "Au moins un type de billet est requis si la billetterie est activée.";
            } else {
                formData.billetterie.ticketTypes.forEach((ticket, index) => {
                    if (!ticket.name) newErrors[`ticket_name_${index}`] = `Le nom du type de ticket ${index + 1} est requis.`;
                    if (ticket.max_places !== -1 && !Number.isInteger(Number(ticket.max_places))) newErrors[`max_places_${index}`] = `Le nombre maximum de places pour le type de ticket ${index + 1} doit être un entier.`;
                    if (ticket.max_places !== -1 && Number(ticket.max_places) < 0) newErrors[`max_places_${index}`] = `Le nombre maximum de places pour le type de ticket ${index + 1} ne peut pas être négatif (sauf -1 pour illimité).`;
                    if (!Number.isFinite(Number(ticket.price_per_unit)) || Number(ticket.price_per_unit) < 0) newErrors[`price_per_unit_${index}`] = `Le prix par unité pour le type de ticket ${index + 1} doit être un nombre positif.`;
                });
            }
        }

        if (!formData.address.latitude || !formData.address.longitude) newErrors.address = "L'adresse (latitude et longitude) est requise.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <Form onSubmit={handleSubmit} className="d-flex justify-content-center mt-5">
            <Card className="w-100">
                <Card.Header><h4>Créer un Événement</h4></Card.Header>

                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom de l'événement</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Type d'événement</Form.Label>
                        <Form.Select
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleChange}
                        >
                            <option value="EXPOSITION">Exposition</option>
                            <option value="AUCTION">Enchères</option>
                            <option value="STUDIO_OPENING">Vernissage</option>
                            <option value="OTHER">Autre</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tags (séparés par des virgules)</Form.Label>
                        <Form.Control
                            type="text"
                            name="tags"
                            value={formData.tags.join(',')}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',') })}
                        />
                    </Form.Group>

                    {formData.images.map((image, index) => (
                        <div key={index}>
                            <h5>Image {index + 1}</h5>
                            <Form.Group className="mb-3">
                                <Form.Label>Lien de l'image</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={image.imageLink}
                                    onChange={(e) => handleArrayChange('images', index, 'imageLink', e.target.value)}
                                />
                            </Form.Group>
                        </div>
                    ))}
                    <Button variant="secondary" onClick={() => addArrayElement('images')}>Ajouter une image</Button>

                    <hr />
                    <h5>Localisation</h5>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="latitude"
                                    value={formData.address.latitude}
                                    onChange={(e) => handleNestedChange('address', 'latitude', e.target.value)}
                                    isInvalid={!!errors.address}
                                />
                                <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="longitude"
                                    value={formData.address.longitude}
                                    onChange={(e) => handleNestedChange('address', 'longitude', e.target.value)}
                                    isInvalid={!!errors.address}
                                />
                                <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <hr />
                    <ProgrammationManager
                        initialProgrammation={formData.programation}
                        onChange={handleProgrammationChange}
                    />

                    <Card bg="success" className="mt-3">
                        <Card.Header>
                            <h5>Billetterie</h5>
                            <Form.Group className="mb-0">
                                <Form.Check
                                    type="switch"
                                    label="Créer une billetterie"
                                    checked={formData.billetterie.enabled}
                                    onChange={handleBilletterieToggle}
                                />
                            </Form.Group>
                        </Card.Header>
                        <Card.Body>
                            {formData.billetterie.enabled && (
                                <TicketingManager
                                    initialTicketing={formData.billetterie}
                                    onChange={handleTicketingChange}
                                />
                            )}
                            {!formData.billetterie.enabled && (
                                <p className="text-muted">Une billetterie permet de vendre des tickets personnalisé.</p>
                            )}
                            {errors.ticketTypes && <Form.Text className="text-danger">{errors.ticketTypes}</Form.Text>}
                            {Object.keys(errors)
                                .filter((key) => key.startsWith('ticket_name_') || key.startsWith('max_places_') || key.startsWith('price_per_unit_'))
                                .map((key) => (
                                    <Form.Text key={key} className="text-danger">{errors[key]}</Form.Text>
                                ))}
                        </Card.Body>
                    </Card>

                    <Button variant="dark" type="submit" className="mt-3">Créer l'événement</Button>
                </Card.Body>
            </Card>
        </Form>
    );
}
