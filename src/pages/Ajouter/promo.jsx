import { useState } from "react";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import {
  Box,
  Typography,
  Button,
  TextField
} from "@mui/material";

export default function AjouterPromotion({ setPage }) {
  const [formData, setFormData] = useState({
    nom: "",
    lien: "",
    dateExpiration: "",
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Promotion ajoutée :", formData);
    setPage("liste");
  };

  return (
    <Box display="flex">
      <Sidebar active="Ajouter Promotion" setActive={() => {}} />
      <Box className='content-promo' flex={1} p={3}>
        <Typography variant="h4" gutterBottom>
          Ajouter une nouvelle promotion
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2} maxWidth="500px">
            <TextField
              label="Nom de la promotion"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />

            <TextField
              label="Lien de la promotion"
              name="lien"
              value={formData.lien}
              onChange={handleChange}
            />

            <TextField
              label="Date d'expiration"
              type="date"
              name="dateExpiration"
              value={formData.dateExpiration}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />

            <Button variant="outlined" component="label">
              Importer une image
              <input type="file" hidden onChange={handleFileChange} />
            </Button>

            <Button type="submit" variant="contained" color="primary">
              Ajouter la promotion
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
