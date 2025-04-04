import React, { useState } from "react";
import { Accordion, Button, Card, Col, Container, InputGroup, Row, useAccordionButton } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { search } from "../controller/SearchController";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {

	const navigate = useNavigate();
	const [isAddressHidden, setIsAddressHidden] = useState(true);

	function CustomToggle({ children, eventKey }) {
		const decoratedOnClick = useAccordionButton(eventKey);

		return (
			<Button variant="dark" onClick={decoratedOnClick}>{children}</Button>
		);
	}

	return (
		<Form onSubmit={() => search(navigate)} style={{filter: "drop-shadow(0 0 0.75rem rgba(0,0,0,0.5))"}}>
			<div className="d-flex">
				<Form.Control type="text" placeholder="Entrez un nom d'événement, d'artiste ou de galerie..." />
				<Button variant="dark" type="submit"><i className='fa fa-search'></i></Button>
			</div>

			<Accordion defaultActiveKey="0">
				<Card>
					<Card.Header className="p-0 m-0 d-flex justify-content-between">
						<div className="mt-1 ms-2">Paramètres de recherche avancés</div>
						<CustomToggle><i className="fa fa-chevron-down text-end"></i></CustomToggle>
					</Card.Header>
					<Accordion.Collapse>
						<Card.Body>
							<Form.Group className="mb-3" controlId="formGridAddress1">
								<Form.Label>Adresse</Form.Label>
								<Form.Check
									type="switch"
									label="Autour de moi"
									onChange={(e) => setIsAddressHidden(e.target.checked)}
									defaultChecked={isAddressHidden}
								/>
								<Form.Control hidden={isAddressHidden} placeholder="Entrez une adresse..." />
							</Form.Group>
							<hr />
							<Row className="mb-3">
								<Form.Group as={Col} controlId="formGridCity">
									<Form.Label>Périmètre de recherche</Form.Label>
									<InputGroup>
										<Form.Control
											placeholder="distance en km"
											type="number"
										/>
										<InputGroup.Text>km</InputGroup.Text>
									</InputGroup>
								</Form.Group>

								<Form.Group as={Col} controlId="formGridState">
									<Form.Label>Type d'événement</Form.Label>
									<Form.Select defaultValue="Choose...">
										<option>Choose...</option>
										<option>...</option>
									</Form.Select>
								</Form.Group>
							</Row>
							<hr />
							<Form.Group className="mb-3" id="formGridCheckbox">
								<Form.Label>Tag(s)</Form.Label>
								<Form.Check type="checkbox" label="PAINT" />
								<Form.Check type="checkbox" label="SCULPTURE" />
								<Form.Check type="checkbox" label="SCENIC_ARTS" />
								<Form.Check type="checkbox" label="PHOTOGRAPHIC" />
								<Form.Check type="checkbox" label="MUSICAL" />
								<Form.Check type="checkbox" label="PERFORMANCE" />
								<Form.Check type="checkbox" label="VISUAL_ART" />
							</Form.Group>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</Form>
	);
}

/*

<Form>
			<Row className="mb-3">
				<Form.Group as={Col} controlId="formGridEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
				</Form.Group>

				<Form.Group as={Col} controlId="formGridPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
			</Row>

			<Form.Group className="mb-3" controlId="formGridAddress1">
				<Form.Label>Address</Form.Label>
				<Form.Control placeholder="1234 Main St" />
			</Form.Group>

			<Form.Group className="mb-3" controlId="formGridAddress2">
				<Form.Label>Address 2</Form.Label>
				<Form.Control placeholder="Apartment, studio, or floor" />
			</Form.Group>

			<Row className="mb-3">
				<Form.Group as={Col} controlId="formGridCity">
					<Form.Label>City</Form.Label>
					<Form.Control />
				</Form.Group>

				<Form.Group as={Col} controlId="formGridState">
					<Form.Label>State</Form.Label>
					<Form.Select defaultValue="Choose...">
						<option>Choose...</option>
						<option>...</option>
					</Form.Select>
				</Form.Group>

				<Form.Group as={Col} controlId="formGridZip">
					<Form.Label>Zip</Form.Label>
					<Form.Control />
				</Form.Group>
			</Row>

			<Form.Group className="mb-3" id="formGridCheckbox">
				<Form.Check type="checkbox" label="Check me out" />
			</Form.Group>

			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>

*/