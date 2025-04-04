import React, { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";

export default function PayementModal(props) {

    const articles = props.articles;

    const [useDefaultPayment, setUseDefaultPayment] = useState(true);

    const totalFacture = articles.reduce((total, article) =>
        total + parseFloat(article.price) * article.amount, 0
    ).toFixed(2);

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>
                    Achat de billets
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped>
                    <thead className="table-dark">
                        <tr>
                            <th>Nom</th>
                            <th>Prix Unitaire</th>
                            <th>Quantité</th>
                            <th>Sous-Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article, index) => (
                            <tr key={index}>
                                <td>{article.name}</td>
                                <td>{article.price}€</td>
                                <td>{article.amount}</td>
                                <td>{(parseFloat(article.price) * article.amount).toFixed(2)}€</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={4} style={{ height: "3rem" }} />
                        </tr>
                        <tr>
                            <td><b>Facture Totale</b></td>
                            <td colSpan={2} />
                            <td><b>{totalFacture}€</b></td>
                        </tr>
                    </tbody>
                </Table>
                <div className="my-5"/>
                <Form>
                    <Form.Check
                        type="checkbox"
                        label="Utiliser mon moyen de paiement habituel"
                        checked={useDefaultPayment}
                        onChange={() => setUseDefaultPayment(!useDefaultPayment)}
                        className="mb-3"
                    />

                    {!useDefaultPayment && (
                        <div className="border p-3 rounded">
                            <Form.Group className="mb-3">
                                <Form.Label>Numéro de Carte</Form.Label>
                                <Form.Control type="text" placeholder="1234 5678 9012 3456" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Date d'Expiration</Form.Label>
                                <Form.Control type="text" placeholder="MM/YY" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Code CVV</Form.Label>
                                <Form.Control type="text" placeholder="123" />
                            </Form.Group>
                        </div>
                    )}

                    <div className="float-end my-3">
                        <Button type="submit">Valider le paiement</Button>
                    </div>
                </Form>

            </Modal.Body>
        </div >
    );
}