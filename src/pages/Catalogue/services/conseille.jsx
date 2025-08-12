import { useState } from "react";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import AjouterConseil from "/Users/dell/Desktop/des mediapro/media-pro/src/pages/Ajouter/conseille"
import "./event.css"
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions
} from "@mui/material";

export default function GestionConseille() {
  const [active, setActive] = useState("Gestion des Conseils");
  const [page, setPage] = useState("liste");

  const conseils = [
    {
      nom: "Bien préparer un événement",
      description: "Conseils pour une bonne organisation",
      lienYoutube: "https://youtu.be/xyz123"
    },
    {
      nom: "Gérer son temps",
      description: "Astuces pour mieux gérer son temps",
      lienYoutube: "https://youtu.be/abc456"
    }
  ];

  if (page === "ajout") {
    return <AjouterConseil setPage={setPage} />;
  }

  return (
    <Box display="flex">
      <Sidebar active={active} setActive={setActive} />
      <Box className="content-cons" flex={1} p={3}>
        <Typography variant="h4" gutterBottom>
          Gestion des Conseils
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => setPage("ajout")}
        >
          Ajouter un conseil
        </Button>

        <Grid container spacing={2}>
          {conseils.map((c, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{c.nom}</Typography>
                  <Typography variant="body2">{c.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="secondary"
                    href={c.lienYoutube}
                    target="_blank"
                  >
                    Voir sur YouTube
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
