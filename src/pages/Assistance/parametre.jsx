import { useState } from "react";
import Sidebar from "/Users/dell/Desktop/des mediapro/media-pro/src/components/sidebar";
import { Box, Typography } from "@mui/material";

export default function Param() {
  const [active] = useState("Paramètres"); // actif par défaut

  return (
    <Box display="flex">
      <Sidebar active={active} setActive={() => {}} /> {/* setActive inutile ici */}
      <Box className="dashboard" flex={1}>
        <Typography variant="h4" color="primary">
          Page des parametre
        </Typography>
        <Typography>
          Ceci est le contenu spécifique à la page Paramétre.
        </Typography>
      </Box>
    </Box>
  );
}
