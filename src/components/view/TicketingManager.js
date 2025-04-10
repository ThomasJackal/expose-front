import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Table } from "react-bootstrap";

export default function TicketingManager({ initialTicketing, onChange }) {
    const [ticketingData, setTicketingData] = useState(initialTicketing || {
        closing_datetime: '',
        ticketTypes: [],
    });

    useEffect(() => {
        if (initialTicketing) {
            setTicketingData(initialTicketing);
        }
    }, [initialTicketing]);

    useEffect(() => {
        if (onChange) {
            onChange(ticketingData);
        }
    }, [ticketingData, onChange]);

    const handleClosingDateTimeChange = (event) => {
        setTicketingData({ ...ticketingData, closing_datetime: event.target.value });
    };

    const handleTicketTypeChange = (index, field, value) => {
        const newTicketTypes = [...ticketingData.ticketTypes];
        newTicketTypes[index][field] = value;
        setTicketingData({ ...ticketingData, ticketTypes: newTicketTypes });
    };

    const handleAddTicketType = () => {
        setTicketingData({
            ...ticketingData,
            ticketTypes: [
                ...ticketingData.ticketTypes,
                { name: '', description: '', max_places: -1, price_per_unit: 0 },
            ],
        });
    };

    const handleRemoveTicketType = (index) => {
        const newTicketTypes = ticketingData.ticketTypes.filter((_, i) => i !== index);
        setTicketingData({ ...ticketingData, ticketTypes: newTicketTypes });
    };

    return (
        <div>
            <Table striped="columns" responsive variant="success">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Place(s)</th>
                        <th>Prix</th>
                        <th>
                            <Button variant="secondary" onClick={handleAddTicketType}>
                                <i className="fa-solid fa-plus"></i>
                            </Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {ticketingData.ticketTypes.map((ticketType, index) => (
                        <tr key={index}>
                            <td>
                                <Form.Control 
                                    type="text"
                                    value={ticketType.name}
                                    onChange={(e) => handleTicketTypeChange(index, 'name', e.target.value)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    value={ticketType.description}
                                    onChange={(e) => handleTicketTypeChange(index, 'description', e.target.value)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    value={ticketType.max_places === -1 ? '' : ticketType.max_places}
                                    onChange={(e) => handleTicketTypeChange(index, 'max_places', parseInt(e.target.value))}
                                />
                            </td>
                            <td>
                                <InputGroup >
                                    <Form.Control
                                        type="number"
                                        value={ticketType.price_per_unit}
                                        onChange={(e) => handleTicketTypeChange(index, 'price_per_unit', parseFloat(e.target.value))}
                                    />
                                    <InputGroup.Text>€</InputGroup.Text>
                                </InputGroup>
                            </td>
                            <td>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleRemoveTicketType(index)}
                                    disabled={ticketingData.ticketTypes.length == 1}
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div>
                <Form.Label htmlFor="closing_datetime"><b>Fermeture de la billetterie le:</b></Form.Label>
                <Form.Control
                    type="datetime-local"
                    id="closing_datetime"
                    value={ticketingData.closing_datetime ? ticketingData.closing_datetime.slice(0, 16) : ''}
                    onChange={handleClosingDateTimeChange}
                    className="mb-3"
                />
            </div>

        </div>
    );
}