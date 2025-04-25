import React, { useState } from "react";
import { Button, Carousel, Col, Form, Modal } from "react-bootstrap";

export default function ImageManager({ currentImages, onImageChange }) {
    const [showModal, setShowModal] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState('');

    const handleAddImage = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewImageUrl('');
    };

    const handleSaveImage = () => {
        if (newImageUrl) {
            onImageChange([...currentImages, { imageLink: newImageUrl }]);
            handleCloseModal();
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = currentImages.filter((_, i) => i !== index);
        onImageChange(newImages);
    };

    const validImages = currentImages.filter(image => image.imageLink);

    return (
        <div className="mb-3">
            <h5>Images de l'événement</h5>
            {validImages.length > 0 ? (
                <Carousel variant="dark">
                    {validImages.map((image, index) => (
                        <Carousel.Item key={`image-${index}`}>
                            <img
                                className="d-block w-100"
                                src={image.imageLink}
                                alt={`Image ${index + 1}`}
                                style={{ maxHeight: '300px', objectFit: 'contain' }}
                            />
                            <Carousel.Caption>
                                <Button variant="danger" size="sm" onClick={() => handleRemoveImage(currentImages.findIndex(img => img === image))}>
                                    <i className="fa-solid fa-trash-can"></i>
                                </Button>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <p>Aucune image ajoutée pour le moment.</p>
            )}
            <Button variant="dark" className="mt-2" onClick={handleAddImage}>
                <i className="fa-solid fa-plus"></i>
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter une image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Lien de l'image</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Entrez l'URL de l'image"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={handleSaveImage}>
                        Ajouter
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}