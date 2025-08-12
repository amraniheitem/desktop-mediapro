import { useState } from "react";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import AjouterPromotion  from '/Users/dell/Desktop/des mediapro/media-pro/src/pages/Ajouter/promo';
import './event.css'
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions
} from "@mui/material";

export default function GestionPromotions() {
  const [active, setActive] = useState("Gestion des Promotions");
  const [page, setPage] = useState("liste");

  const promotions = [
    {
      nom: "Promo Été 2025",
      dateExpiration: "2025-08-31",
      lien: "https://example.com/promo-ete",
      image: "https://via.placeholder.com/300"
    },
    {
      nom: "Black Friday",
      dateExpiration: "2025-11-29",
      lien: "https://example.com/black-friday",
      image: "https://via.placeholder.com/300"
    }
  ];

  if (page === "ajout") {
    return <AjouterPromotion setPage={setPage} />;
  }

  return (
    <Box display="flex">
      <Sidebar active={active} setActive={setActive} />
      <Box className='content-promo' flex={1} p={3}>
        <Typography variant="h4" gutterBottom>
          Gestion des Promotions
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => setPage("ajout")}
        >
          Ajouter une promotion
        </Button>

        <Grid container spacing={2}>
          {promotions.map((p, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={p.image}
                  alt={p.nom}
                />
                <CardContent>
                  <Typography variant="h6">{p.nom}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Expire le : {p.dateExpiration}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="secondary"
                    href={p.lien}
                    target="_blank"
                  >
                    Voir la promotion
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
