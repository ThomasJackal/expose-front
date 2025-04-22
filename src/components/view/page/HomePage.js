import React from "react";
import MovingTitle from "../../utils/MovingTitle.js"
import { Col, Row } from "react-bootstrap";

export default function HomePage() {

    return (
        <>
            <div className="container py-5">
                <h1 className="text-center mb-4 fw-bold text-secondary-emphasis">
                    Bienvenue sur <MovingTitle>EXPOSE</MovingTitle>
                </h1>
                <p className="text-center mb-5 text-secondary">
                    Connectons les âmes créatives et donnons vie aux chefs-d'œuvre de demain.
                </p>

                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card shadow-lg ps-3">
                            <div className="card-body">
                                <h2 className="card-title text-secondary">
                                    <i className="fas fa-calendar-alt me-2"></i> Le Pouls de l'Art Vivant
                                </h2>
                                <ul className="list-unstyled">
                                    <li><strong>Création et gestion :</strong> Donnez naissance à vos événements, du croquis à la scène.</li>
                                    <li><strong>Explorer le monde artistique :</strong> Plongez dans l'inattendu, découvrez les expositions et performances près de vous.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="card shadow-lg ps-3">
                            <div className="card-body">
                                <h2 className="card-title text-secondary">
                                    <i className="fas fa-palette me-2"></i> Votre Galerie, Votre Univers
                                </h2>
                                <ul className="list-unstyled">
                                    <li><strong>Un espace d’expression :</strong> Offrez à vos œuvres un écrin numérique à la hauteur de leur essence.</li>
                                    <li><strong>Rencontrez votre public :</strong> Laissez amateurs et collectionneurs s’émerveiller devant votre talent.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="card shadow-lg ps-3">
                            <div className="card-body">
                                <h2 className="card-title text-secondary">
                                    <i className="fas fa-bullhorn me-2"></i> Rayonnez au-delà des Frontières
                                </h2>
                                <ul className="list-unstyled">
                                    <li><strong>Un écho artistique :</strong> Propulsez vos créations au-delà des murs grâce à nos outils de diffusion.</li>
                                    <li><strong>Un public sans limites :</strong> Faites vibrer les cœurs et marquez les esprits bien au-delà de votre atelier.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="card shadow-lg ps-3">
                            <div className="card-body">
                                <h2 className="card-title text-secondary">
                                    <i className="fas fa-hand-holding-heart me-2"></i> L'Art, Porté par la Passion
                                </h2>
                                <ul className="list-unstyled">
                                    <li><strong>Un soutien engagé :</strong> Permettez à vos admirateurs de vous encourager via dons et mécénat.</li>
                                    <li><strong>Des liens sincères :</strong> Cultivez des relations uniques avec ceux qui croient en votre art.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}