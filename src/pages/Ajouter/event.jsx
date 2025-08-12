import { useState } from "react";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";

export default function AjoutezEvenement({ onBack }) {
  const [active, setActive] = useState("Ajouter Événement");
  const [formData, setFormData] = useState({
    titre: "",
    date: "",
    lieu: "",
    type: "",
    animateur: "",
    prix: "",
    heure: "",
    responsable: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Événement ajouté :", formData);
    onBack && onBack(); // retourne à la liste si la fonction est passée
  };

  return (
    <Box display="flex">
      <Sidebar active={active} setActive={setActive} />
      <Box className="content-add-event" flex={1} p={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Ajouter un nouvel événement
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            maxWidth="500px"
            mx="auto"
          >
            <TextField
              label="Titre de l'événement"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Lieu"
              name="lieu"
              value={formData.lieu}
              onChange={handleChange}
              required
              fullWidth
            />

            <FormControl fullWidth required>
              <InputLabel>Type d'événement</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <MenuItem value="Sport">Sport</MenuItem>
                <MenuItem value="Culture">Culture</MenuItem>
                <MenuItem value="Formation">Formation</MenuItem>
                <MenuItem value="Autre">Autre</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Animateur de l'événement"
              name="animateur"
              value={formData.animateur}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Prix"
              name="prix"
              value={formData.prix}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Heure"
              type="time"
              name="heure"
              value={formData.heure}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              label="Responsable de l'événement"
              name="responsable"
              value={formData.responsable}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />

            <Box display="flex" gap={2}>
              <Button type="submit" variant="contained" color="primary">
                Ajouter l'événement
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={onBack}
              >
                Annuler
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
