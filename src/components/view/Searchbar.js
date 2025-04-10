import React, { useState } from "react";
import { Accordion, Button, Card, Col, Container, InputGroup, Row, useAccordionButton } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { search } from "../controller/SearchController";
import { useNavigate } from "react-router-dom";

export default function Searchbar(props) {

	const navigate = useNavigate();
	const [isAddressHidden, setIsAddressHidden] = useState(true);

	const [searchParams, setSearchParams] = useState({
		query: "",
		address: "",
		distance: "",
		eventType: "",
		tags: []
	});

	function AdvancedSearchToggle({ children, eventKey }) {
		const decoratedOnClick = useAccordionButton(eventKey);

		return (
			<Button variant="dark" onClick={decoratedOnClick}>{children}</Button>
		);
	}

	function handleChange(e) {
		setSearchParams({
			...searchParams,
			[e.target.name]: e.target.value
		});
	}

	function handleCheckboxChange(e) {
		const { value, checked } = e.target;
		setSearchParams((prev) => ({
			...prev,
			tags: checked
				? [...prev.tags, value]
				: prev.tags.filter(tag => tag !== value)
		}));
	}

	function handleSubmit(e) {
		e.preventDefault();
		const jsonOutput = {
			query: searchParams.query,
			address: props.searchPosition,
			distance: searchParams.distance ? parseInt(searchParams.distance) : null,
			eventType: searchParams.eventType || null,
			tags: searchParams.tags.length > 0 ? searchParams.tags : null
		};
		console.log(props.searchPosition)
		search(jsonOutput, props.setEvents, props.searchPosition);
	}


	return (
		<Form onSubmit={handleSubmit} style={{ filter: "drop-shadow(0 0 0.75rem rgba(0,0,0,0.5))" }}>
			<div className="d-flex mb-2">
				<div className="w-100">
					<Form.Control
						type="text"
						placeholder="Entrez un nom d'événement, d'artiste ou de galerie..."
						name="query"
						value={searchParams.query}
						onChange={handleChange}
					/>
					<InputGroup>
						<InputGroup.Text>
							<Form.Check
								type="checkbox"
								onChange={(e) => setIsAddressHidden(e.target.checked)}
								defaultChecked={isAddressHidden}
								label={<i className="fa-solid fa-location-dot"></i>}
							/>
						</InputGroup.Text>
						<Form.Control
							placeholder={isAddressHidden ? "Autour de moi" : "Entrez une addresse"}
							disabled={isAddressHidden}
							name="address"
							value={searchParams.address}
							onChange={handleChange}
						/>
					</InputGroup>
				</div>
				<Button variant="dark" type="submit"><i className='fa fa-search'></i></Button>
			</div>

			<Accordion defaultActiveKey="0">
				<Card>
					<Card.Header className="p-0 m-0 d-flex justify-content-between">
						<div className="mt-1 ms-2">Paramètres de recherche avancés</div>
						<AdvancedSearchToggle><i className="fa fa-chevron-down text-end"></i></AdvancedSearchToggle>
					</Card.Header>
					<Accordion.Collapse>
						<Card.Body>
							<Row className="mb-3">
								<Form.Group as={Col}>
									<Form.Label>Périmètre de recherche</Form.Label>
									<InputGroup>
										<Form.Control
											placeholder="distance en km"
											type="number"
											name="distance"
											value={searchParams.distance}
											onChange={handleChange}
										/>
										<InputGroup.Text>km</InputGroup.Text>
									</InputGroup>
								</Form.Group>

								<Form.Group as={Col} controlId="formGridState">
									<Form.Label>Type d'événement</Form.Label>
									<Form.Select
										name="eventType"
										value={searchParams.eventType}
										onChange={handleChange}
									>
										<option value="">Choisissez...</option>
										<option value="EXPOSITION">Exposition</option>
										<option value="AUCTION">Enchères</option>
										<option value="STUDIO_OPENING">Vernissage</option>
										<option value="OTHER">Autre</option>
									</Form.Select>
								</Form.Group>
							</Row>
							<hr />
							<Form.Group className="mb-3">
								<Form.Label>Tag(s)</Form.Label>
								{["PAINT", "SCULPTURE", "SCENIC_ARTS", "PHOTOGRAPHIC", "MUSICAL", "PERFORMANCE", "VISUAL_ART"].map((tag) => (
									<Form.Check 
										key={tag}
										type="checkbox" 
										label={tag}
										value={tag}
										checked={searchParams.tags.includes(tag)}
										onChange={handleCheckboxChange}
									/>
								))}
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