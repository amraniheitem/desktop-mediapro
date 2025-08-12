import { useState } from "react";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import "./animateur.css"
import {
  Box,
  Typography,
  Button,
  TextField
} from "@mui/material";

export default function AjouterConseil({ setPage }) {
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    image: null,
    lienYoutube: ""
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
    console.log("Conseil ajouté :", formData);
    setPage("liste");
  };

  return (
    <Box display="flex">
      <Sidebar active="Ajouter Conseil" setActive={() => {}} />
      <Box className="content-cons" flex={1} p={3}>
        <Typography variant="h4" gutterBottom>
          Ajouter un nouveau conseil
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2} maxWidth="500px">
            <TextField
              label="Nom du conseil"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />

            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
            />

            <Button variant="outlined" component="label">
              Importer une image
              <input type="file" hidden onChange={handleFileChange} />
            </Button>

            <TextField
              label="Lien YouTube"
              name="lienYoutube"
              value={formData.lienYoutube}
              onChange={handleChange}
            />

            <Button type="submit" variant="contained" color="primary">
              Ajouter le conseil
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
