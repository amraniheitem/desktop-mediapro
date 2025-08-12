import { useState } from "react";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import CardAnimateur from "./card";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

import {
  Box,
  TextField,
} from "@mui/material";
import './animateur.css'

export default function Animateur() {
  const [active] = useState("Animateurs"); // Onglet actif
  const [search, setSearch] = useState(""); // Valeur du champ recherche
  const navigate = useNavigate();

  const [animateurs] = useState([
    {
      id: 1,
      name: "Amine",
      description: "Animateur sportif",
      image: "https://via.placeholder.com/150",
      nbreve: 15,
      nbrlike: 40,
      ranking: 4.3,
      wilaya: "Alger",
    },
    {
      id: 2,
      name: "Karima",
      description: "Animatrice mariage",
      image: "https://via.placeholder.com/150",
      nbreve: 22,
      nbrlike: 60,
      ranking: 4.7,
      wilaya: "Oran",
    },
    {
      id: 3,
      name: "Yacine",
      description: "Animateur culturel",
      image: "https://via.placeholder.com/150",
      nbreve: 10,
      nbrlike: 25,
      ranking: 4.0,
      wilaya: "Constantine",
    },   {
      id: 4,
      name: "Yacine",
      description: "Animateur culturel",
      image: "https://via.placeholder.com/150",
      nbreve: 10,
      nbrlike: 25,
      ranking: 4.0,
      wilaya: "Constantine",
    },
       {
      id: 5,
      name: "Yacine",
      description: "Animateur culturel",
      image: "https://via.placeholder.com/150",
      nbreve: 10,
      nbrlike: 25,
      ranking: 4.0,
      wilaya: "Constantine",
    },
  ]);

  // Filtrage selon le champ de recherche
  const filteredAnimateurs = animateurs.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box display="flex">
      <Sidebar active={active} setActive={() => {}} />

      <Box className="dashboard" flex={1}>
        <div className="content">
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
  <h2 style={{ fontWeight: "900", margin: 0 }}>Animateurs</h2>
  <Button
    variant="contained"
    color="primary"
    onClick={() => {
       navigate("/ajouter-animateur")
    }}
  >
    + Ajouter
  </Button>
</Box>

          <p>
            On a déjà +150 animateurs dans MediaPro dans +4 types d’événements
          </p>

          <TextField
            variant="outlined"
            placeholder="Rechercher un animateur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mb: 2, maxWidth: "600px", width: "100%" }}
          />

          <div className="filter-container">
            <button className="filter-btn">Classement</button>
            <button className="filter-btn">Wilaya</button>
            <button className="filter-btn">Nbr des événements</button>
          </div>

          <div className="cards-container">
            {filteredAnimateurs.length > 0 ? (
              filteredAnimateurs.map((animateur) => (
                <CardAnimateur
                  key={animateur.id}
                  id={animateur.id}
                  name={animateur.name}
                  description={animateur.description}
                  image={animateur.image}
                  nbreve={animateur.nbreve}
                  nbrlike={animateur.nbrlike}
                  ranking={animateur.ranking}
                  wilaya={animateur.wilaya}
                />
              ))
            ) : (
              <p>Aucun animateur trouvé</p>
            )}
          </div>
        </div>
      </Box>
    </Box>
  );
}
