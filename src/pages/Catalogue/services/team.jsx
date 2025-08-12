import { useState } from "react";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import AjouterFonctionnaire from "/Users/dell/Desktop/des mediapro/media-pro/src/pages/Ajouter/team";
import './event.css'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WcIcon from "@mui/icons-material/Wc";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function Fonctionnaires() {
  const [active, setActive] = useState("Fonctionnaires");
  const [showAjout, setShowAjout] = useState(false);

  // Exemple de données mock
  const fonctionnaires = [
    { nom: "Ali Ben Ahmed", secteur: "Animation & Présentation", wilaya: "Alger", age: 30, gender: "Homme" },
    { nom: "Sonia Belkacem", secteur: "Voix-off & Doublage", wilaya: "Oran", age: 27, gender: "Femme" },
    { nom: "Karim Bouzid", secteur: "Production audiovisuelle", wilaya: "Constantine", age: 35, gender: "Homme" }
  ];

  if (showAjout) {
    return <AjouterFonctionnaire onClose={() => setShowAjout(false)} />;
  }

  return (
    <Box display="flex">
      <Sidebar active={active} setActive={setActive} />

      <Box className='content-team' flex={1} p={3}>
        <Typography variant="h4" color="primary" gutterBottom>
          Gestion des Fonctionnaires
        </Typography>

        {/* Bouton Ajouter */}
        <Box mb={3}>
          <Button variant="contained" color="primary" onClick={() => setShowAjout(true)}>
            Ajouter un fonctionnaire
          </Button>
        </Box>

        {/* Tableau */}
        <Box border="1px solid #ddd" borderRadius="8px" p={2} mb={4}>
          <Grid container spacing={2} sx={{ fontWeight: "bold", borderBottom: "1px solid #ccc", pb: 1 }}>
            <Grid item xs={3}>Nom</Grid>
            <Grid item xs={3}>Secteur</Grid>
            <Grid item xs={2}>Wilaya</Grid>
            <Grid item xs={2}>Âge</Grid>
            <Grid item xs={2}>Genre</Grid>
          </Grid>
          {fonctionnaires.map((f, index) => (
            <Grid container spacing={2} key={index} sx={{ py: 1, borderBottom: "1px solid #eee" }}>
              <Grid item xs={3}>{f.nom}</Grid>
              <Grid item xs={3}>{f.secteur}</Grid>
              <Grid item xs={2}>{f.wilaya}</Grid>
              <Grid item xs={2}>{f.age}</Grid>
              <Grid item xs={2}>{f.gender}</Grid>
            </Grid>
          ))}
        </Box>

        {/* Statistiques */}
        <Typography variant="h5" gutterBottom>
          Statistiques
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Card sx={{ backgroundColor: "#e3f2fd" }}>
              <CardContent>
                <GroupIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                <Typography variant="h6">Total Fonctionnaires</Typography>
                <Typography variant="h4">{fonctionnaires.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ backgroundColor: "#f1f8e9" }}>
              <CardContent>
                <LocationOnIcon sx={{ fontSize: 40, color: "#388e3c" }} />
                <Typography variant="h6">Wilayas couvertes</Typography>
                <Typography variant="h4">3</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ backgroundColor: "#fff3e0" }}>
              <CardContent>
                <WcIcon sx={{ fontSize: 40, color: "#f57c00" }} />
                <Typography variant="h6">Répartition Hommes/Femmes</Typography>
                <Typography variant="body1">2 Hommes / 1 Femme</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ backgroundColor: "#fce4ec" }}>
              <CardContent>
                <CalendarTodayIcon sx={{ fontSize: 40, color: "#c2185b" }} />
                <Typography variant="h6">Âge moyen</Typography>
                <Typography variant="h4">30 ans</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
