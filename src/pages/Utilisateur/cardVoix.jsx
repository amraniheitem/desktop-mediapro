import React from "react";
import { useNavigate } from "react-router-dom";
import "./cardVoix.css"; // On réutilise le même style que CardAnimateur

const CardVoix = ({ id, name, wilaya, description, image, langue, nbrlike, ranking, nbrvid }) => {
    const navigate = useNavigate();

    return (
        <div
            className="cardvoix"
            onClick={() => navigate(`/voi/${id}`)}
            style={{ cursor: "pointer" }}
        >
            <div className="card-content">
                {/* Partie profil */}
                <div className="slach">
                    <img
                        src={image || "./profile.jpg"}
                        alt={name}
                        className="profile-img"
                        onError={(e) => e.target.src = './profile.jpg'}
                    />
                    <div className="text">
                        <h3 className="card-title">{name || "Nom inconnu"}</h3>
                        <h4 className="card-wilaya">{wilaya || "Wilaya non précisée"}</h4>
                    </div>
                                            <h3>{langue || "Langue non spécifiée"}</h3>

                </div>

                {/* Statistiques */}
                <div className="stat">
                    <div className="stat2">
                        <div className="event">
                            <h3>{nbrvid ?? 0}</h3>
                            <p>{(nbrvid ?? 0) > 1 ? "Vidéos" : "Vidéo"}</p>
                        </div>
                        <div className="like">
                            <h3>{nbrlike ?? 0}</h3>
                            <p>J'aime</p>
                        </div>
                    </div>
                    <div className="ranking">
                        <h3>{ranking ?? "0.0"}</h3>
                        <h3>Evalutation</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardVoix;
