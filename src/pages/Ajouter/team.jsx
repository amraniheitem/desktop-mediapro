import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@mui/material";

export default function AjouterFonctionnaire({ onClose }) {
  const [formData, setFormData] = useState({
    nom: "",
    secteur: "",
    wilaya: "",
    age: "",
    gender: ""
  });

  const secteurs = [
    "Animation & Présentation",
    "Voix-off & Doublage",
    "Production audiovisuelle",
    "Formations & Coaching",
    "Marketing & Communication",
    "Ventes & Partenariats",
    "Support & Service Client",
    "Boutique Media",
    "Conseil & Expertise Média"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Nouveau fonctionnaire:", formData);
    if (onClose) onClose();
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Ajouter un Fonctionnaire
      </Typography>

      <TextField
        fullWidth
        label="Nom complet"
        name="nom"
        value={formData.nom}
        onChange={handleChange}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Secteur</InputLabel>
        <Select
          name="secteur"
          value={formData.secteur}
          onChange={handleChange}
        >
          {secteurs.map((secteur, index) => (
            <MenuItem key={index} value={secteur}>{secteur}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Wilaya"
        name="wilaya"
        value={formData.wilaya}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Âge"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Genre</InputLabel>
        <Select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <MenuItem value="Homme">Homme</MenuItem>
          <MenuItem value="Femme">Femme</MenuItem>
        </Select>
      </FormControl>

      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Enregistrer
        </Button>
        <Button variant="outlined" sx={{ ml: 2 }} onClick={onClose}>
          Annuler
        </Button>
      </Box>
    </Box>
  );
}
