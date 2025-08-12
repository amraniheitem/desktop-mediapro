import { useState } from "react";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import AjoutezEvenement from "/Users/dell/Desktop/des mediapro/media-pro/src/pages/Ajouter/event"
import "./event.css";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Grid
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function GestionEvenements() {
  const [active, setActive] = useState("Gestion des Événements");
  const [page, setPage] = useState("liste"); // "liste" ou "ajout"

  // Exemple de données mock
  const evenements = [
    { titre: "Conférence Tech", date: "2025-08-15", lieu: "Alger", type: "Culture" },
    { titre: "Tournoi de Football", date: "2025-09-01", lieu: "Oran", type: "Sport" },
    { titre: "Formation Marketing", date: "2025-08-20", lieu: "Constantine", type: "Formation" }
  ];

  // Si on est sur la page "ajout"
  if (page === "ajout") {
    return <AjoutezEvenement onBack={() => setPage("liste")} />;
  }

  // Sinon on reste sur la liste
  return (
    <Box display="flex">
      <Sidebar active={active} setActive={setActive} />
      <Box className="content-event" flex={1} p={3}>
        {/* Titre */}
        <Typography variant="h4" color="primary" gutterBottom>
          Gestion des Événements
        </Typography>

        {/* Filtres */}
        <Box display="flex" gap={2} mb={3}>
          <TextField label="Rechercher" variant="outlined" size="small" />
<FormControl style={{ width: "220px" }} size="small">
            <InputLabel >Type</InputLabel>
            <Select defaultValue="">
              <MenuItem value="">Tous</MenuItem>
              <MenuItem value="Sport">Sport</MenuItem>
              <MenuItem value="Culture">Culture</MenuItem>
              <MenuItem value="Formation">Formation</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPage("ajout")} // clic → page ajout
          >
            Ajouter un événement
          </Button>
        </Box>

        {/* Tableau des événements */}
        <Box border="1px solid #ddd" borderRadius="8px" p={2} mb={4}>
          <Grid container spacing={2} sx={{ fontWeight: "bold", borderBottom: "1px solid #ccc", pb: 1 }}>
            <Grid item xs={4}>Titre</Grid>
            <Grid item xs={3}>Date</Grid>
            <Grid item xs={3}>Lieu</Grid>
            <Grid item xs={2}>Type</Grid>
          </Grid>
          {evenements.map((event, index) => (
            <Grid container spacing={2} key={index} sx={{ py: 1, borderBottom: "1px solid #eee" }}>
              <Grid item xs={4}>{event.titre}</Grid>
              <Grid item xs={3}>{event.date}</Grid>
              <Grid item xs={3}>{event.lieu}</Grid>
              <Grid item xs={2}>{event.type}</Grid>
            </Grid>
          ))}
        </Box>

        {/* Statistiques */}
        <Typography variant="h5" gutterBottom>
          Statistiques
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: "#e3f2fd" }}>
              <CardContent>
                <EventIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                <Typography variant="h6">Événements créés</Typography>
                <Typography variant="h4">{evenements.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: "#f1f8e9" }}>
              <CardContent>
                <GroupIcon sx={{ fontSize: 40, color: "#388e3c" }} />
                <Typography variant="h6">Participants</Typography>
                <Typography variant="h4">325</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: "#fff3e0" }}>
              <CardContent>
                <BarChartIcon sx={{ fontSize: 40, color: "#f57c00" }} />
                <Typography variant="h6">Événement le + populaire</Typography>
                <Typography variant="h6">Tournoi de Football</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
