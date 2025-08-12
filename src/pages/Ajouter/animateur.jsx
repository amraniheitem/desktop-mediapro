import { useState } from "react";
import {
    Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, FormLabel
} from "@mui/material";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import "./animateur.css";

const Ajoutez = () => {
    const [active, setActive] = useState("Ajouter");
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        sex: "",
        niveau: "",
        wilaya: "",
        type_evenement: "",
        adresse: "",
        num_carte: "",
        photo: null,
    });

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Données soumises :", formData);
    };

    return (
        <Box className="box">
            <Sidebar active={active} setActive={setActive} />

            <Box className="content-add">
                <Typography variant="h4" align="center" gutterBottom>
                    Ajouter un nouveau animateur
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box display="flex" gap={10}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <Button variant="outlined" component="label">
                                Upload Photo
                                <input type="file" hidden name="photo" onChange={handleFileChange} />
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Ajouter
                            </Button>
                        </Box>

                        <Box display="flex" flexDirection="column" gap={2} width="100%" sx={{ gap: "20px" }}>
                            <TextField label="Nom" name="nom" value={formData.nom} onChange={handleChange} required fullWidth />
                            <TextField label="Prénom" name="prenom" value={formData.prenom} onChange={handleChange} required fullWidth />
                            <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required fullWidth />
                            <TextField label="Numéro de téléphone" name="telephone" value={formData.telephone} onChange={handleChange} required fullWidth />

                            <FormControl component="fieldset">
                                <FormLabel component="legend">Sexe :</FormLabel>
                                <RadioGroup row name="sex" value={formData.sex} onChange={handleChange}>
                                    <FormControlLabel value="Homme" control={<Radio />} label="Homme" />
                                    <FormControlLabel value="Femme" control={<Radio />} label="Femme" />
                                </RadioGroup>
                            </FormControl>

                            <FormControl fullWidth required>
                                <InputLabel>Niveau</InputLabel>
                                <Select name="niveau" value={formData.niveau} onChange={handleChange}>
                                    <MenuItem value="Baccalauréat">Baccalauréat</MenuItem>
                                    <MenuItem value="Licence">Licence</MenuItem>
                                    <MenuItem value="Master">Master</MenuItem>
                                    <MenuItem value="Doctorat">Doctorat</MenuItem>
                                    <MenuItem value="Autre">Autre</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth required>
                                <InputLabel>Wilaya</InputLabel>
                                <Select name="wilaya" value={formData.wilaya} onChange={handleChange}>
                                    <MenuItem value="">Sélectionnez une wilaya</MenuItem>
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
                                        <MenuItem key={wilaya} value={wilaya}>
                                            {wilaya}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth required>
                                <InputLabel>Type des événements</InputLabel>
                                <Select name="type_evenement" value={formData.type_evenement} onChange={handleChange}>
                                    <MenuItem value="Sport">Sport</MenuItem>
                                    <MenuItem value="Culture">Culture</MenuItem>
                                    <MenuItem value="Religion">Religion</MenuItem>
                                    <MenuItem value="Autre">Autre</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField label="Adresse" name="adresse" value={formData.adresse} onChange={handleChange} required fullWidth />
                            <TextField label="Numéro de carte" name="num_carte" value={formData.num_carte} onChange={handleChange} required fullWidth />
                        </Box>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default Ajoutez;
