import React, { useState } from "react";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import "./formation.css";

export default function Formation() {
  const [active] = useState("Formations & Éducation");

  const [formations, setFormations] = useState([
    { id: 1, titre: "Animation Événementielle", inscrits: 25, genreH: 15, genreF: 10 },
    { id: 2, titre: "Voix Off Professionnelle", inscrits: 18, genreH: 8, genreF: 10 },
    { id: 3, titre: "Marketing Média", inscrits: 30, genreH: 20, genreF: 10 },
  ]);

  const totalFormations = formations.length;
  const totalInscrits = formations.reduce((acc, f) => acc + f.inscrits, 0);
  const totalHommes = formations.reduce((acc, f) => acc + f.genreH, 0);
  const totalFemmes = formations.reduce((acc, f) => acc + f.genreF, 0);

  const ajouterFormation = () => {
    const titre = prompt("Nom de la formation ?");
    if (titre) {
      setFormations([
        ...formations,
        { id: Date.now(), titre, inscrits: 0, genreH: 0, genreF: 0 }
      ]);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar à gauche */}
      <Sidebar active={active} setActive={() => {}} />

      {/* Contenu principal */}
      <div className="formation-container" style={{ flex: 1, padding: 20 }}>
        <h1>📚 Gestion des Formations</h1>

        {/* Statistiques */}
        <div className="stats-container">
          <div className="stat-card">
            <h2>{totalFormations}</h2>
            <p>Formations</p>
          </div>
          <div className="stat-card">
            <h2>{totalInscrits}</h2>
            <p>Total inscrits</p>
          </div>
          <div className="stat-card">
            <h2>{totalHommes}</h2>
            <p>Hommes</p>
          </div>
          <div className="stat-card">
            <h2>{totalFemmes}</h2>
            <p>Femmes</p>
          </div>
        </div>

        {/* Tableau des formations */}
        <table className="formation-table">
          <thead>
            <tr>
              <th>Nom de la formation</th>
              <th>Inscrits</th>
              <th>Hommes</th>
              <th>Femmes</th>
            </tr>
          </thead>
          <tbody>
            {formations.map((f) => (
              <tr key={f.id}>
                <td>{f.titre}</td>
                <td>{f.inscrits}</td>
                <td>{f.genreH}</td>
                <td>{f.genreF}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bouton d'ajout */}
        <button className="add-btn" onClick={ajouterFormation}>
          ➕ Ajouter une formation
        </button>
      </div>
    </div>
  );
}
