import { useState } from "react";
import {
  Box, Typography, Button, TextField, Select, MenuItem,
  FormControl, InputLabel, RadioGroup, FormControlLabel,
  Radio, FormLabel
} from "@mui/material";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import "./animateur.css";

const Ajoutez_client = () => {
  const [active, setActive] = useState("Ajouter");

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    sexe: "",
    entreprise: "",
    wilaya: "",
    adresse: "",
    conventions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Client ajouté :", formData);
    // Tu pourras ici faire un POST vers ton backend
  };

  return (
    <Box className="box">
      <Sidebar active={active} setActive={setActive} />

      <Box className="content-add">
        <Typography variant="h4" align="center" gutterBottom>
          Ajouter un nouveau client
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="center">
            <Box display="flex" flexDirection="column" gap={3} width="70%">
              <TextField label="Nom" name="nom" value={formData.nom} onChange={handleChange} required fullWidth />
              <TextField label="Prénom" name="prenom" value={formData.prenom} onChange={handleChange} required fullWidth />
              <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required fullWidth />
              <TextField label="Téléphone" name="telephone" value={formData.telephone} onChange={handleChange} required fullWidth />

              <FormControl component="fieldset">
                <FormLabel>Sexe</FormLabel>
                <RadioGroup row name="sexe" value={formData.sexe} onChange={handleChange}>
                  <FormControlLabel value="Homme" control={<Radio />} label="Homme" />
                  <FormControlLabel value="Femme" control={<Radio />} label="Femme" />
                </RadioGroup>
              </FormControl>

              <TextField label="Entreprise" name="entreprise" value={formData.entreprise} onChange={handleChange} required fullWidth />

              <FormControl fullWidth required>
                <InputLabel>Wilaya</InputLabel>
                <Select name="wilaya" value={formData.wilaya} onChange={handleChange}>
                  {[
                    "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar",
                    "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger",
                    "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma",
                    "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh",
                    "Illizi", "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt",
                    "El Oued", "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma",
                    "Aïn Témouchent", "Ghardaïa", "Relizane", "El M'ghair", "El Menia", "Ouled Djellal",
                    "Bordj Baji Mokhtar", "Béni Abbès", "Timimoun", "Touggourt", "Djanet", "In Salah",
                    "In Guezzam"
                  ].map((wilaya) => (
                    <MenuItem key={wilaya} value={wilaya}>{wilaya}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField label="Adresse" name="adresse" value={formData.adresse} onChange={handleChange} required fullWidth />
              <TextField label="Nombre de conventions" type="number" name="conventions" value={formData.conventions} onChange={handleChange} required fullWidth />

              <Button type="submit" variant="contained" color="primary">
                Ajouter le client
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Ajoutez_client;
