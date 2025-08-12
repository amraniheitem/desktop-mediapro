import React from "react";
import { useNavigate } from "react-router-dom";
import "./card.css";
import Animateur from "./animateur";

const CardAnimateur = ({ id, name, wilaya, description, image, nbreve, nbrlike, ranking }) => {
    const navigate = useNavigate();

    return (
        <div
            className="card"
            onClick={() => {
                navigate("/animateurinfo}"); 
            }}
            style={{ cursor: "pointer" }}
        >
            <div className="card-content">
                <div className="slach">
                    <img src={"./profile.jpg"} alt="Profile" className="profile-img" />
                    <div className="text">
                        <h3 className="card-title">{name}</h3>
                        <h4 className="card-wilaya">{wilaya}</h4>
                    </div>
                </div>
                <div className="stat">
                    <div className="stat2">
                        <div className="event">
                            <h3>{nbreve}</h3>
                            <p>{nbreve > 1 ? "Événements" : "Événement"}</p>
                        </div>
                        <div className="like">
                            <h3>{nbrlike}</h3>
                            <p>J'aime</p>
                        </div>
                    </div>
                    <div className="ranking">
                        <h3>{ranking}</h3>
                        <h3>Évaluation</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardAnimateur;
