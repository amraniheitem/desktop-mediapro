import { useState } from "react";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import { Box, Typography } from "@mui/material";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { TextField } from '@mui/material';
import Cardvoix from './cardVoix'

export default function Voix() {
  const [active] = useState("Voix-off"); // actif par défaut
  const [search, setSearch] = useState(""); // Valeur du champ recherche
  const navigate = useNavigate();

  const [voixs] = useState([
    {
      id: 1,
      name: "Amine",
      description: "voix sportif",
      image: "https://via.placeholder.com/150",
      nbrvid: 15,
      nbrlike: 40,
      ranking: 4.3,
      wilaya: "Alger",
    },
    {
      id: 2,
      name: "Karima",
      description: "Animatrice mariage",
      image: "https://via.placeholder.com/150",
      nbrvid: 22,
      nbrlike: 60,
      ranking: 4.7,
      wilaya: "Oran",
    },
    {
      id: 3,
      name: "Yacine",
      description: "voix culturel",
      image: "https://via.placeholder.com/150",
      nbrvid: 10,
      nbrlike: 25,
      ranking: 4.0,
      wilaya: "Constantine",
    },   {
      id: 4,
      name: "Yacine",
      description: "voix culturel",
      image: "https://via.placeholder.com/150",
      nbrvid: 10,
      nbrlike: 25,
      ranking: 4.0,
      wilaya: "Constantine",
    },
       {
      id: 5,
      name: "Yacine",
      description: "voix culturel",
      image: "https://via.placeholder.com/150",
      nbrvid: 10,
      nbrlike: 25,
      ranking: 4.0,
      wilaya: "Constantine",
    },
  ]);

  // Filtrage selon le champ de recherche
  const filteredvoixs = voixs.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box display="flex">
      <Sidebar active={active} setActive={() => {}} />

      <Box className="dashboard" flex={1}>
        <div className="content">
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
  <h2 style={{ fontWeight: "900", margin: 0 }}>voixs</h2>
  <Button
    variant="contained"
    color="primary"
    onClick={() => {
       navigate("/ajouter-voix")
    }}
  >
    + Ajouter
  </Button>
</Box>

          <p>
            On a déjà +150 voixs dans MediaPro dans +4 types d’événements
          </p>

          <TextField
            variant="outlined"
            placeholder="Rechercher un voix..."
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
            {filteredvoixs.length > 0 ? (
              filteredvoixs.map((voix) => (
                <Cardvoix
                  key={voix.id}
                  id={voix.id}
                  name={voix.name}
                  description={voix.description}
                  image={voix.image}
                  nbrvid={voix.nbrvid}
                  nbrlike={voix.nbrlike}
                  ranking={voix.ranking}
                  wilaya={voix.wilaya}
                />
              ))
            ) : (
              <p>Aucun voix trouvé</p>
            )}
          </div>
        </div>
      </Box>
    </Box>
  );}
